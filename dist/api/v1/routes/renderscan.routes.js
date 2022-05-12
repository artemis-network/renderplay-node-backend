"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderScanRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
exports.renderScanRoutes = router;
const renderscan_controller_1 = require("../controllers/renderscan/renderscan.controller");
const fileStorageEngine = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './renderscan_images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date(Date.now()).getTime().toString() + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: fileStorageEngine });
router.post('/api/v1/renderscan/init', upload.single("image"), renderscan_controller_1.initializeRenderScanGamesController);
router.post('/api/v1/renderscan/enter', renderscan_controller_1.enterIntoRenderScanContestController);
router.post('/api/v1/renderscan/save', upload.single("image"), renderscan_controller_1.saveRenderScanContestResultController);
router.post('/api/v1/renderscan/contestants', renderscan_controller_1.getRenderScanContestantsController);
router.post('/api/v1/renderscan/participants', renderscan_controller_1.getRenderScanParticipantsController);
