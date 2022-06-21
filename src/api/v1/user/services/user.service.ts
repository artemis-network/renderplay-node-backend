import bcrypt from 'bcrypt';
import { logger } from '../../utils/logger';
import { OAuth2Client } from 'google-auth-library'
import { JWT } from '../../utils/jwt';
import { EmailSender } from '../../utils/email'
import { GOOGLE_OAUTH_CLIENT } from '../../../../config'

import crypto from 'crypto';

const client: any = new OAuth2Client(GOOGLE_OAUTH_CLIENT)

import { db } from '../../db'
import { DBObject } from '../../db_object';
import { Error } from 'mongoose';
import { DBErrors, ErrorTypes } from '../../errors/db.errors';

const { User, UserWallet } = db;

export enum Role { ADMIN = "ADMIN", USER = "USER", GUEST = "GUEST" }

export class UserServices {

	static createToken = (): string => {
		try {
			return crypto.randomBytes(32).toString("hex")
		} catch (e) {
			throw new Error("Error");
		}
	}

	static setToken = async (email: string) => {
		const token = UserServices.createToken();
		await User.findOneAndUpdate({ email: email }, {
			$set: { token: token }
		});
		return token;
	}

	static updateToken = async (token: string) => {
		const newToken = UserServices.createToken();
		await User.findOneAndUpdate({ token: token }, {
			$set: { token: newToken }
		});
		return newToken;
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

	static isUserAlreadyExists = async (username: string, email: string) => {
		const query = await User.findOne({ $or: [{ username: username }, { email: email }] })
		try {
			const user = new DBObject(query)
			await user.get()
			return true;
		} catch (err: any) {
			if (
				err.name === ErrorTypes.OBJECT_NOT_FOUND_ERROR ||
				err.name === ErrorTypes.OBJECT_UN_DEFINED_ERROR
			)
				return false
			return true
		}
	}

	static createUser = async (username: string, email: string, hash: string, token: string, isGoogleAccount: boolean) => {
		return await User.create({
			username: username, email: email, password: hash, token: token,
			isActivated: false, isGoogleAccount: isGoogleAccount, isVerified: false,
			userType: Role.USER.toString()
		});
	}

	static authenticateUser = async (username: string) => {
		try {
			const query = await User.findOne({ $or: [{ username: username }, { email: username }] })
			const user = new DBObject(query)
			return user.get()
		} catch (err: any) {
			throw new Error(err)
		}
	}

	static verifyPassword = async (password: string, hash: string) => bcrypt.compareSync(password, hash);


	static googleLogin = async (googleToken: string) => {
		try {

			const { payload } = await client.verifyIdToken({ idToken: googleToken, audience: GOOGLE_OAUTH_CLIENT })
			const { email, email_verified } = payload
			const username = email.split("@")[0]

			if (email_verified) {
				try {
					const { _id }: any = await UserServices.createUser(username, email, "", "", true)
					UserServices.createWalletForUser(_id)
					const token: string = JWT.generateJWTToken("username");
					return {
						error: false, userId: _id, message: "SUCCESS",
						username: username, errorType: "NONE",
						email: email, accessToken: token,
						publicToken: "[ADMIN]", status: 200
					};
				} catch (err: any) {
					console.log(err)
					if (err["code"] === 11000) {
						const user = await User.findOne({ email: email })
						const token: string = JWT.generateJWTToken(username);
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

	static googleMobileLogin = async (email: string) => {
		try {
			const username = email.split("@")[0]
			try {
				const newUser = await User.create({
					username: username, email: email, password: "", token: "",
					isActivated: false, isGoogleAccount: true, isVerified: false,
				})
				UserServices.createWalletForUser(newUser._id)
				const token: string = JWT.generateJWTToken(newUser._id);
				return {
					error: false, userId: newUser._id, message: "SUCCESS",
					username: newUser.username, errorType: "NONE", email: newUser.email,
					accessToken: token, publicToken: "[ADMIN]", status: 200
				};
			} catch (err: any) {
				console.log(err)
				if (err["code"] === 11000) {
					const user = await User.findOne({ email: email })
					const token: string = JWT.generateJWTToken(user?._id);
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

