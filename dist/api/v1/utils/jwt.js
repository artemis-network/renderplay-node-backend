"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWTToken = exports.generateJWTToken = void 0;
const jwt_simple_1 = require("jwt-simple");
const generateJWTToken = (session) => {
    // Always use HS512 to sign the token
    const algorithm = "HS512";
    // Determine when the token should expire
    const issued = Date.now();
    const fiveHoursInMs = 60 * 60 * 5 * 1000;
    const expires = issued + fiveHoursInMs;
    const encoded = {
        session,
        issued: issued,
        expires: expires
    };
    return (0, jwt_simple_1.encode)(encoded, "SECRET", algorithm);
};
exports.generateJWTToken = generateJWTToken;
const decodeJWTToken = (token) => (0, jwt_simple_1.decode)(token, "SECRET");
exports.decodeJWTToken = decodeJWTToken;
