
import bcrypt from 'bcrypt';
import { logger } from '../../utils/logger';
import { createToken } from '../../utils/token'
import { generateJWTToken, decodeJWTToken } from '../../utils/jwt';
import { OAuth2Client } from 'google-auth-library'
// import { EmailSender, getEmailVerificationHTML } from '../../utils/email'
import { GOOGLE_OAUTH_CLIENT } from '../../../../config'

const client: any = new OAuth2Client(GOOGLE_OAUTH_CLIENT)

import { UserDocument, UserWalletDocument, db } from '../../models/db'
const { User, UserWallet } = db;

type UserInput = {
	username: UserDocument['username'];
	email: UserDocument['email'];
	password: UserDocument['password'];
	isGoogleAccount: UserDocument['isGoogleAccount'];
	isVerified: UserDocument['isVerified'];
	isActivated: UserDocument['isActivated'];
	token: UserDocument['token'];
};


type UserWalletInput = {
	balance: UserWalletDocument['balance'];
	isActive: UserWalletDocument['isActive'];
	user: UserWalletDocument['user'];
};

interface Result {
	message: string;
	error: boolean;
	errorType: string,
	status: number
	userId?: string,
	username?: string,
	email?: string,
	accessToken?: string,
	publicToken?: string
}

// const sendVerificationEmailForUser = async (token: string, email: string, username: string) => {
// 	try {
// 		logger.info(">> sending verification email to " + username + " >> ");
// 		const html: string = getEmailVerificationHTML("");
// 		const emailSender: EmailSender = new EmailSender();
// 		emailSender.sendEmailVerificationEmail("contact@renderverse.io", email, "Verify Email", "", html.toString());
// 		logger.info(">> verification email has sent to " + username + " >> ");
// 	} catch (e) {
// 		logger.error(e);
// 		throw new Error()
// 	}
// }

const createWalletForUser = (user_id: string) => {
	logger.info(">> creating wallet for" + user_id + " >> ");
	const userWalletInput: UserWalletInput = {
		balance: 0,
		isActive: true,
		user: user_id
	};
	UserWallet.create(userWalletInput).then((wallet) => {
		logger.info(">> wallet created for " + user_id + " >> ");
	}).catch((err) => {
		logger.info(">> Error " + user_id + " >> " + err);
	});
}

const createUser = async (username: string, email: string, password: string) => {
	try {
		logger.info(">> creating user " + username + " >> ");
		logger.info(">> creating token for " + username + " >> ");
		const token: string = createToken();

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const userInput: UserInput = {
			username: username,
			email: email,
			password: hash,
			isActivated: false,
			isGoogleAccount: false,
			isVerified: false,
			token: token
		};

		const newUser = await User.create(userInput);
		logger.info(">> user created " + username + " >> ");
		createWalletForUser(newUser._id)
		const result: Result = {
			message: "Success",
			errorType: "SUCCESS",
			error: false,
			status: 200
		};
		return result
	} catch (err: any) {
		logger.error(err);
		if (err.code === 11000) {
			const error: Result = {
				message: "username or email already in use",
				errorType: "USER_ALREADY_EXIST",
				error: true,
				status: 500
			}
			return error;
		}
	}
}


const loginUser = async (username: string, password: string) => {
	try {

		logger.info(">> authenticating user " + username + " >> ");
		const user = await User.findOne({ $or: [{ username: username }, { email: username }] })
		const authorized = bcrypt.compareSync(password, user?.password.toString() || "");
		logger.info(">> checking password" + " >> ");

		if (!authorized) {
			logger.info(">> invalid username or password " + " >> ");
			const response: Result = {
				message: "invalid username or password",
				status: 500,
				errorType: "INVALID_CRENDENTAILS",
				error: true
			}
			return response;
		}
		// !fix the email issue and uncomment this code
		http://localhost:3000/api/v1/users/register
		logger.info(">> password matched " + " >> ");
		// if (!user?.isVerified) {
		// 	logger.info(">> user email not verified " + " >> ");
		// 	const response: Result = {
		// 		error: true,
		// 		message: "verify email, to login",
		// 		errorType: "UNAUTHORIZED_EMAIL",
		// 		status: 401
		// 	}
		// 	return response;
		// }
		logger.info(">> verified user email " + " >> ");

		logger.info(">> authentication successfully " + username + " >> ");
		logger.info(">> generating token " + username + " >> ");
		const token: string = generateJWTToken(username);

		logger.info(">> sending resposne " + username + " >> ");

		const result: Result = {
			error: false,
			message: "SUCCESS",
			userId: user?._id,
			username: user?.username,
			email: user?.email,
			accessToken: token,
			publicToken: "[ADMIN]",
			errorType: 'NONE',
			status: 0
		}
		return result
	} catch (err) {
		logger.error(err);
		const response: Result = {
			errorType: "INVALID_CREDENTIALS",
			message: "Username/Email does not exists",
			status: 500,
			error: true
		}
		return response;
	}
}

const googleLogin = async (googleToken: string) => {
	try {
		const { payload } = await client.verifyIdToken({ idToken: googleToken, audience: GOOGLE_OAUTH_CLIENT })
		const { email, email_verified } = payload
		const username = email.split("@")[0]
		if (email_verified) {
			logger.info(">> creating user " + username + " >> ");
			logger.info(">> creating token for " + username + " >> ");
			const userInput: UserInput = {
				username: username,
				email: email,
				password: "",
				isActivated: false,
				isGoogleAccount: true,
				isVerified: false,
				token: ""
			};
			try {
				const newUser = await User.create(userInput)
				logger.info(">> user created " + username + " >> ");
				createWalletForUser(newUser._id)
				logger.info(">> authentication successfully " + username + " >> ");
				logger.info(">> generating token " + username + " >> ");
				const token: string = generateJWTToken("username");
				logger.info(">> sending resposne " + username + " >> ");

				const result: Result = {
					error: false,
					userId: newUser._id,
					message: "SUCCESS",
					username: newUser.username,
					errorType: "NONE",
					email: newUser.email,
					accessToken: token,
					publicToken: "[ADMIN]",
					status: 200
				};
				return result;
			} catch (err: any) {
				if (err["code"] === 11000) {
					const user = await User.findOne({ email: email })
					logger.info(">> generating token " + username + " >> ");
					const token: string = generateJWTToken(username);
					logger.info(">> sending resposne " + username + " >> ");
					const response: Result = {
						error: false,
						userId: user?._id,
						message: "SUCCESS",
						username: username,
						email: email,
						accessToken: token,
						publicToken: "[ADMIN]",
						status: 200,
						errorType: "NONE"
					}
					return response;
				}
			}
		}
	} catch (err: any) {
		logger.error(err);
	}

}



export { createUser, loginUser, googleLogin }