"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.pingRoutes = router;
router.get("/api/v1/ping", (req, res) => res.send("Welcome to RENDERVERSE BACKEND"));
