import 'dotenv/config'

const ADMIN = {
	username: process.env.ADMIN_USERNAME || "",
	email: process.env.ADMIN_EMAIL || "",
	password: process.env.ADMIN_PASSWORD || ""
}

const EMAIL_CONFIG = {
	username: process.env.EMAIL_VERIFICATION_EMAIL || "",
	password: process.env.EMAIL_VERIFICATION_PASSWORD || "",
	port: process.env.EMAIL_VERIFICATION_EMAIL_PORT || 0,
	host: process.env.EMAIL_VERIFICATION_HOST || ""
}

const JWT_SECRET = process.env.JWT_SECRET || ""
const GOOGLE_OAUTH_CLIENT = process.env.GOOGLE_OUTH_CLIENT_CREDENTIAL || ""
const MONGO_DB_URL = process.env.MONGO_DB_URL || ""
const PORT = process.env.PORT || 0

export {
	PORT,
	ADMIN,
	JWT_SECRET,
	MONGO_DB_URL,
	EMAIL_CONFIG,
	GOOGLE_OAUTH_CLIENT
}