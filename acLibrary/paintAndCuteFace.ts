
import * as faceapi from 'face-api.js';
import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from '../commons';

const PATH = require('path');
const FS = require('fs');
const PNG_TO_JPG = require('png-to-jpeg');
const IMAGE_PATH_OUT = './out/faces';

async function paintAndCutFace(pathFileName) {
    await  faceDetectionNet.loadFromDisk('./weights'); // Load models

    var fileName = PATH.basename(pathFileName);
    const IMG = await canvas.loadImage(pathFileName);
    const DETEC_ALL_FACES = await faceapi.detectAllFaces(IMG, faceDetectionOptions);
    const IMG_CANVA = faceapi.createCanvasFromMedia(IMG) as any
    faceapi.draw.drawDetections(IMG_CANVA, DETEC_ALL_FACES); // draw face

    // 01. save images with face detectecs
    saveFile(fileName, IMG_CANVA.toBuffer('image/jpeg'));

    // 02. save micro face image to other directory
    const MICRO_IMG_CANVAS =  await faceapi.extractFaces(IMG, DETEC_ALL_FACES);
    MICRO_IMG_CANVAS.forEach(function(canvaImage, index) {
        let dataUrl = canvaImage.toDataURL();
        let buffer = new Buffer(dataUrl.split(/,\s*/)[1],'base64');

        // Save micro images
        PNG_TO_JPG({quality: 100})(buffer).then(output => {
            if (!FS.existsSync(IMAGE_PATH_OUT)) {
                FS.mkdirSync(IMAGE_PATH_OUT)
            } 
            FS.writeFileSync(IMAGE_PATH_OUT + "/" + index + "_" + fileName + ".jpg", output);
        });
    });
}

// Export class
export { paintAndCutFace }