"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.rendleRoutes = router;
const rendle_game_controller_1 = require("../controllers/rendle/rendle_game.controller");
router.get('/api/v1/rendles', rendle_game_controller_1.getRendleGameTypesController);
router.get('/api/v1/rendles/reset', rendle_game_controller_1.resetRendlesGameTypesController);
router.post('/api/v1/rendles/enter', rendle_game_controller_1.enterRendlesContestController);
router.post('/api/v1/rendles/save', rendle_game_controller_1.saveRendleContestResultController);
router.post('/api/v1/rendles/participants', rendle_game_controller_1.getRendleParticipantsController);
