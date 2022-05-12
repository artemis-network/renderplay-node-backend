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
exports.getRendleCurrentGuesses = exports.updateCurrentGuesses = void 0;
const db_1 = require("../../models/db");
const { RendleGameState, RendleWord } = db_1.db;
const updateCurrentGuesses = (userId, contestId, word, gameStateId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rendleWord = yield RendleWord.create({ guess: word });
        const gameState = yield RendleGameState.findOne({ userId: userId });
        if (gameState !== null) {
            yield (gameState === null || gameState === void 0 ? void 0 : gameState.updateOne({
                $set: {
                    words: [...gameState.words, rendleWord]
                }
            }));
            yield (gameState === null || gameState === void 0 ? void 0 : gameState.save());
            return { message: "Successfully updated guess", gameStateId: gameState === null || gameState === void 0 ? void 0 : gameState._id };
        }
        else {
            const wordList = [];
            wordList.push(rendleWord);
            const input = {
                contestId: contestId,
                userId: userId,
                words: wordList
            };
            const { _id } = yield RendleGameState.create(input);
            return { message: "Successfully created new guess", gameStateId: _id };
        }
    }
    catch (error) {
        console.log(error);
        return { message: `Something went wrong ${error}` };
    }
});
exports.updateCurrentGuesses = updateCurrentGuesses;
const getRendleCurrentGuesses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameState = yield RendleGameState.findOne({ userId: userId }).populate('words').exec();
        const words = yield (gameState === null || gameState === void 0 ? void 0 : gameState.words);
        const guesses = [];
        for (let i = 0; i < words.length; i++) {
            guesses.push(yield words[i].guess);
        }
        return { guesses: guesses };
    }
    catch (error) {
        return { message: `Something went wrong ${error}` };
    }
});
exports.getRendleCurrentGuesses = getRendleCurrentGuesses;
