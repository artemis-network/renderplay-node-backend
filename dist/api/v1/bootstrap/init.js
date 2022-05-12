"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const rendle_init_1 = require("./rendle_init");
const user_init_1 = require("./user_init");
const bootstrap = () => {
    (0, rendle_init_1.initializeRendleGames)();
    (0, user_init_1.initUser)();
};
exports.bootstrap = bootstrap;
