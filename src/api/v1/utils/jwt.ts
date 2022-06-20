import { encode, decode, TAlgorithm } from "jwt-simple";
import { JWT_SECRET } from '../../../config'

export class JWT {

	static unPackCredentials = (token: string) => {
		const creds = this.decodeJWTToken(token)
		return creds
	}

	static generateJWTToken = (userId: string, userAccess: string): string => {
		const data = { userId: userId, userAccess: userAccess }
		const session = JSON.stringify(data)
		// Always use HS512 to sign the token
		const algorithm: TAlgorithm = "HS512";
		// Determine when the token should expire
		const issued = new Date().getTime()
		const fiveHoursInMs = 60 * 60 * 5 * 1000;
		const expires = issued + fiveHoursInMs;
		const encoded: any = { session: session, issued: issued, expires: expires };
		return encode(encoded, JWT_SECRET, algorithm);
	}

	static decodeJWTToken = (token: string) => decode(token, JWT_SECRET);
}
