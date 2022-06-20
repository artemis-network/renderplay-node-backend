
import bcrypt from 'bcrypt';
import { logger } from '../../utils/logger';
import { createToken } from '../../utils/token'
import { OAuth2Client } from 'google-auth-library'
import { generateJWTToken, decodeJWTToken } from '../../utils/jwt';
import { EmailSender } from '../../utils/email'
import { GOOGLE_OAUTH_CLIENT } from '../../../../config'

const client: any = new OAuth2Client(GOOGLE_OAUTH_CLIENT)

import { db } from '../../db'

const { User, UserWallet } = db;


interface Result {
	message: string; error: boolean; errorType: string, status: number, userId?: string,
	username?: string, email?: string, accessToken?: string, publicToken?: string
}

export class UserServices {

	static setToken = async (email: string) => {
		const token = createToken();
		await User.findOneAndUpdate({ email: email }, {
			$set: { token: token }
		});
		return token;
	}

	static setIsVerified = async (token: string, isVerified: boolean) => {
		await User.findOneAndUpdate({ token: token }, {
			$set: {
				isVerified: isVerified
			}
		});
	}

	static isValidToken = async (token: string) => {
		const user = await User.findOne({ token: token });
		if (!user) return false
		return true
	}

	static clearToken = async (token: string) => {
		const user = await User.findOneAndUpdate({ token: token }, {
			$set: { token: "" }
		});
		await user?.save()
	}

	static hashPassword = async (password: string) => {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}

	static setPassword = async (token: string, hash: string) => {
		const user = await User.findOne({ token: token });
		await user?.updateOne({ $set: { password: hash } })
	}

	static createWalletForUser = async (user_id: string) =>
		await UserWallet.create({ balance: 5000, isActive: true, user: user_id })

	static createUser = async (username: string, email: string, password: string, isGoogleAccount: boolean) => {
		try {
			const token: string = createToken();
			const hash = await UserServices.hashPassword(password)
			const newUser = await User.create({
				username: username, email: email, password: hash, token: token,
				isActivated: false, isGoogleAccount: false, isVerified: false,
			});
			await UserServices.createWalletForUser(newUser._id)
			const html: string = EmailSender.getEmailVerificationHTML(token);
			await EmailSender.sendMail(
				"contact@renderverse.io", email, "Verify Email", "", html.toString()
			);
			return { message: "Success", errorType: "NONE", error: false, status: 200 };
		} catch (err: any) {
			logger.error(err);
			if (err.code === 11000) {
				return {
					message: "username or email already in use", errorType: "USER_ALREADY_EXIST",
					error: true, status: 500
				}
			}
		}
	}

	static loginUser = async (username: string, password: string) => {
		try {
			const user = await User.findOne({ $or: [{ username: username }, { email: username }] })
			const authorized = bcrypt.compareSync(password, user?.password.toString() || "");
			if (!authorized) {
				const response: Result = {
					message: "invalid username or password", status: 500,
					errorType: "INVALID_CRENDENTAILS", error: true
				}
				return response;
			}

			if (!user?.isVerified) {
				logger.info(">> user email not verified " + " >> ");
				const response: Result = {
					error: true,
					message: "verify email, to login",
					errorType: "UNAUTHORIZED_EMAIL",
					status: 401
				}
				return response;
			}
			const token: string = generateJWTToken(username);

			const result: Result = {
				error: false, message: "SUCCESS", userId: user?._id, username: user?.username,
				email: user?.email, accessToken: token, publicToken: "[ADMIN]", errorType: 'NONE',
				status: 0
			}
			return result
		} catch (err) {
			logger.error(err);
			const response: Result = {
				errorType: "INVALID_CREDENTIALS", message: "Username/Email does not exists",
				status: 500, error: true
			}
			return response;
		}
	}

	static googleLogin = async (googleToken: string) => {
		try {
			const { payload } = await client.verifyIdToken({ idToken: googleToken, audience: GOOGLE_OAUTH_CLIENT })
			const { email, email_verified } = payload
			const username = email.split("@")[0]
			if (email_verified) {
				try {
					const { userId }: any = await UserServices.createUser(username, email, "", true)
					UserServices.createWalletForUser(userId)
					const token: string = generateJWTToken("username");
					return {
						error: false, userId: userId, message: "SUCCESS",
						username: username, errorType: "NONE",
						email: email, accessToken: token,
						publicToken: "[ADMIN]", status: 200
					};
				} catch (err: any) {
					console.log(err)
					if (err["code"] === 11000) {
						const user = await User.findOne({ email: email })
						const token: string = generateJWTToken(username);
						return {
							error: false, userId: user?._id, message: "SUCCESS",
							username: username, email: email, accessToken: token,
							publicToken: "[ADMIN]", status: 200, errorType: "NONE"
						}
					}
				}
			}
		} catch (err: any) {
			return {
				error: true, userId: null, message: "FAILED", username: "", email: "",
				accessToken: "", publicToken: "[GUEST]", status: 200, errorType: "FAILED"
			}
		}

	}

	static googleMobileLogin = async (email: string): Promise<Result | undefined> => {
		try {
			const username = email.split("@")[0]
			try {
				const newUser = await User.create({
					username: username, email: email, password: "", token: "",
					isActivated: false, isGoogleAccount: true, isVerified: false,
				})
				UserServices.createWalletForUser(newUser._id)
				const token: string = generateJWTToken("username");
				return {
					error: false, userId: newUser._id, message: "SUCCESS",
					username: newUser.username, errorType: "NONE", email: newUser.email,
					accessToken: token, publicToken: "[ADMIN]", status: 200
				};
			} catch (err: any) {
				console.log(err)
				if (err["code"] === 11000) {
					const user = await User.findOne({ email: email })
					const token: string = generateJWTToken(username);
					return {
						error: false, userId: user?._id, message: "SUCCESS",
						username: username, email: email, accessToken: token,
						publicToken: "[ADMIN]", status: 200, errorType: "NONE"
					}
				}
			}
		} catch (err: any) {
			return {
				error: true, userId: "", message: "FAILED", username: "", email: "",
				accessToken: "", publicToken: "[GUEST]", status: 200, errorType: "FAILED"
			}
		}

	}

}

