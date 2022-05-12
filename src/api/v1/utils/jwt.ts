import { encode, decode, TAlgorithm } from "jwt-simple";
import { JWT_SECRET } from '../../../config'

const generateJWTToken = (session: string): string => {
	// Always use HS512 to sign the token
	const algorithm: TAlgorithm = "HS512";
	// Determine when the token should expire
	const issued = Date.now();
	const fiveHoursInMs = 60 * 60 * 5 * 1000;
	const expires = issued + fiveHoursInMs;
	const encoded: any = {
		session,
		issued: issued,
		expires: expires
	};
	return encode(encoded, JWT_SECRET, algorithm);
}

const decodeJWTToken = (token: string) => decode(token, JWT_SECRET);

export {
	generateJWTToken,
	decodeJWTToken
}