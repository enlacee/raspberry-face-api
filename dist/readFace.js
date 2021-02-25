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
const path = require('path');
const fs = require('fs');
const basePathDirectory = './imagesToRead';
const pngToJpeg = require('png-to-jpeg');
const faceapi = __importStar(require("face-api.js"));
const commons_1 = require("./commons");
var baseDir = './out/faces';
function paintAndCutFaces(pathFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield commons_1.faceDetectionNet.loadFromDisk('./weights');
        var fileName = path.basename(pathFileName);
        const img = yield commons_1.canvas.loadImage(pathFileName);
        const detections = yield faceapi.detectAllFaces(img, commons_1.faceDetectionOptions);
        const out = faceapi.createCanvasFromMedia(img);
        faceapi.draw.drawDetections(out, detections);
        // EXTRA TAREA: (extraer los rostros) extrac faces
        const faceImagesCanvas = yield faceapi.extractFaces(img, detections);
        console.log('faceImagesCanvas', faceImagesCanvas);
        faceImagesCanvas.forEach(function (faceImageCanva, currentIndex) {
            const dataUrl = faceImageCanva.toDataURL();
            // const uu = dataUrl.substring('data:image/png;base64,'.length);
            // fs.writeFileSync(currentIndex+".png", uu, 'base64');
            const buffer = new Buffer(dataUrl.split(/,\s*/)[1], 'base64');
            pngToJpeg({ quality: 100 })(buffer).then((output) => {
                if (!fs.existsSync(baseDir)) {
                    fs.mkdirSync(baseDir);
                }
                fs.writeFileSync(baseDir + "/" + currentIndex + "_" + fileName + ".jpg", output);
            });
        });
        commons_1.saveFile(fileName, out.toBuffer('image/jpeg'));
        console.log('done, saved results to out/' + fileName);
    });
}
const directoryPath = path.join(__dirname, basePathDirectory);
fs.readdir(directoryPath, function (err, files) {
    // handing error
    if (err)
        throw err;
    files.forEach(function (file) {
        // list whatever you want to do with this files
        let fileExt = path.extname(file);
        if (fileExt === '.jpg') {
            let pathFile = basePathDirectory + '/' + file;
            fs.stat(pathFile, function (err, stats) {
                if (err)
                    throw err;
                console.log(file);
                // console.log(`stats: ${JSON.stringify(stats)}`);
                // console.log(`File Data Last Modified: ${stats.mtime}`);
                paintAndCutFaces(pathFile);
            });
        }
    });
});
//   run()
//# sourceMappingURL=readFace.js.map