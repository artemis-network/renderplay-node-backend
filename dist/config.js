"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_OAUTH_CLIENT = exports.EMAIL_CONFIG = exports.MONGO_DB_URL = exports.JWT_SECRET = exports.ADMIN = exports.PORT = void 0;
require("dotenv/config");
const ADMIN = {
    username: process.env.ADMIN_USERNAME || "",
    email: process.env.ADMIN_EMAIL || "",
    password: process.env.ADMIN_PASSWORD || ""
};
exports.ADMIN = ADMIN;
const EMAIL_CONFIG = {
    username: process.env.EMAIL_VERIFICATION_EMAIL || "",
    password: process.env.EMAIL_VERIFICATION_PASSWORD || "",
    port: process.env.EMAIL_VERIFICATION_EMAIL_PORT || 0,
    host: process.env.EMAIL_VERIFICATION_HOST || ""
};
exports.EMAIL_CONFIG = EMAIL_CONFIG;
const JWT_SECRET = process.env.JWT_SECRET || "";
exports.JWT_SECRET = JWT_SECRET;
const GOOGLE_OAUTH_CLIENT = process.env.GOOGLE_OUTH_CLIENT_CREDENTIAL || "";
exports.GOOGLE_OAUTH_CLIENT = GOOGLE_OAUTH_CLIENT;
const MONGO_DB_URL = process.env.MONGO_DB_URL || "";
exports.MONGO_DB_URL = MONGO_DB_URL;
const PORT = process.env.PORT || 0;
exports.PORT = PORT;
