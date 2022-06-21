import 'dotenv/config'

const ADMIN = {
	username: process.env.ADMIN_USERNAME || "",
	email: process.env.ADMIN_EMAIL || "",
	password: process.env.ADMIN_PASSWORD || ""
}

const EMAIL_CONFIG = {
	username: process.env.EMAIL_AUTH_USER || "",
	password: process.env.EMAIL_AUTH_PASSWORD || "",
	port: process.env.EMAIL_VERIFICATION_PORT || 25,
	host: process.env.EMAIL_VERIFICATION_HOST || "",
	email: process.env.EMAIL_VERIFICATION_EMAIL || "",
}

const JWT_SECRET = process.env.JWT_SECRET || ""
const GOOGLE_OAUTH_CLIENT = process.env.GOOGLE_OUTH_CLIENT_CREDENTIAL || ""
const MONGO_DB_URL = process.env.MONGO_DB_URL || ""
const PORT = process.env.PORT || 5000

const AZURE_BLOB_CREDS = {
	key: process.env.AZURE_BLOB_KEY || "",
	account: process.env.AZURE_BLOB_ACCOUNT || "",
	container: process.env.AZURE_BLOB_CONTAINER || "",
	connectionString: process.env.AZURE_CONNECTION_STRING || ""
}

const API_ADMIN_PASSWORD = process.env.API_ADMIN_PASSWORD || ""

export {
	PORT,
	ADMIN,
	JWT_SECRET,
	MONGO_DB_URL,
	EMAIL_CONFIG,
	AZURE_BLOB_CREDS,
	API_ADMIN_PASSWORD,
	GOOGLE_OAUTH_CLIENT
}