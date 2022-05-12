"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentGuessesController = exports.getRendleCurrentGuessesController = void 0;
const rendle_game_state_services_1 = require("../../services/rendle/rendle_game_state.services");
const getRendleCurrentGuessesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const rendles = yield (0, rendle_game_state_services_1.getRendleCurrentGuesses)(userId);
        return res.status(200).json(rendles);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.getRendleCurrentGuessesController = getRendleCurrentGuessesController;
const updateCurrentGuessesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, contestId, word, gameStateId } = req.body;
        const response = yield (0, rendle_game_state_services_1.updateCurrentGuesses)(userId, contestId, word, gameStateId);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(200).json({ message: "Not OK" });
    }
});
exports.updateCurrentGuessesController = updateCurrentGuessesController;
