"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.paintAndCutFace = void 0;
const faceapi = __importStar(require("face-api.js"));
const commons_1 = require("../commons");
const PATH = require('path');
const FS = require('fs');
const PNG_TO_JPG = require('png-to-jpeg');
const IMAGE_PATH_OUT = './out/faces';
function paintAndCutFace(pathFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield commons_1.faceDetectionNet.loadFromDisk('./weights'); // Load models
        var fileName = PATH.basename(pathFileName);
        const IMG = yield commons_1.canvas.loadImage(pathFileName);
        const DETEC_ALL_FACES = yield faceapi.detectAllFaces(IMG, commons_1.faceDetectionOptions);
        const IMG_CANVA = faceapi.createCanvasFromMedia(IMG);
        faceapi.draw.drawDetections(IMG_CANVA, DETEC_ALL_FACES); // draw face
        // 01. save images with face detectecs
        commons_1.saveFile(fileName, IMG_CANVA.toBuffer('image/jpeg'));
        // 02. save micro face image to other directory
        const MICRO_IMG_CANVAS = yield faceapi.extractFaces(IMG, DETEC_ALL_FACES);
        MICRO_IMG_CANVAS.forEach(function (canvaImage, index) {
            let dataUrl = canvaImage.toDataURL();
            let buffer = new Buffer(dataUrl.split(/,\s*/)[1], 'base64');
            // Save micro images
            PNG_TO_JPG({ quality: 100 })(buffer).then((output) => {
                if (!FS.existsSync(IMAGE_PATH_OUT)) {
                    FS.mkdirSync(IMAGE_PATH_OUT);
                }
                FS.writeFileSync(IMAGE_PATH_OUT + "/" + index + "_" + fileName + ".jpg", output);
            });
        });
    });
}
exports.paintAndCutFace = paintAndCutFace;
//# sourceMappingURL=paintAndCuteFace.js.map