"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const logger_1 = require("./api/v1/utils/logger");
const init_1 = require("./api/v1/bootstrap/init");
const ping_route_1 = require("./api/v1/routes/ping.route");
const user_routes_1 = require("./api/v1/routes/user.routes");
const rendle_routes_1 = require("./api/v1/routes/rendle.routes");
const app = (0, express_1.default)();
const init = () => {
    logger_1.logger.info("🚀  server started");
    logger_1.logger.info("🚀  bootstrap initialization");
    (0, init_1.bootstrap)();
    logger_1.logger.info("🚀  bootstrap completed");
};
app.use((0, body_parser_1.json)());
app.use(ping_route_1.pingRoutes);
app.use(user_routes_1.userRoutes);
app.use(rendle_routes_1.rendleRoutes);
app.listen(3000, () => init());
