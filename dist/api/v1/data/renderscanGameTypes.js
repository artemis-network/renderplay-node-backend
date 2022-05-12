"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderscanGameTypes = void 0;
const moment_1 = __importDefault(require("moment"));
function getCurrentIndianDateTime() {
    var time = moment_1.default.utc().format();
    return new Date(time);
}
const date = getCurrentIndianDateTime();
const numOfHours = 4;
date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
const renderscanGameTypes = [
    {
        gameType: "FREE",
        startsOn: getCurrentIndianDateTime(),
        isExpired: false,
        entryFee: 1000
    },
    {
        gameType: "PAID",
        startsOn: date,
        isExpired: false,
        entryFee: 1500
    },
];
exports.renderscanGameTypes = renderscanGameTypes;
