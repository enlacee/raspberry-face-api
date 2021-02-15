const path = require('path');
const fs = require('fs');
const basePathDirectory = './imagesToRead';
const pngToJpeg = require('png-to-jpeg');

import * as faceapi from 'face-api.js';
import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from './commons';


var baseDir = './out/faces';
async function paintAndCutFaces(pathFileName) {

    await faceDetectionNet.loadFromDisk('./weights')

    var fileName = path.basename(pathFileName);
    const img = await canvas.loadImage(pathFileName)
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions)
  
    const out = faceapi.createCanvasFromMedia(img) as any
    faceapi.draw.drawDetections(out, detections)

    // EXTRA TAREA: (extraer los rostros) extrac faces
    const faceImagesCanvas = await faceapi.extractFaces(img, detections);
    console.log ('faceImagesCanvas', faceImagesCanvas);
    faceImagesCanvas.forEach(function(faceImageCanva, currentIndex){
        const dataUrl = faceImageCanva.toDataURL();
        // const uu = dataUrl.substring('data:image/png;base64,'.length);
        // fs.writeFileSync(currentIndex+".png", uu, 'base64');
        const buffer = new Buffer(dataUrl.split(/,\s*/)[1],'base64');
        pngToJpeg({quality: 100})(buffer).then(output => {
            
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir)
            } 
            fs.writeFileSync(baseDir + "/" + currentIndex + "_" + fileName + ".jpg", output);
        });
    })
    
    saveFile(fileName, out.toBuffer('image/jpeg'))
    console.log('done, saved results to out/' + fileName)
}

const directoryPath = path.join(__dirname, basePathDirectory);
fs.readdir( directoryPath, function(err, files){
    // handing error
    if (err) throw err;

    files.forEach(function(file){
        // list whatever you want to do with this files
        let fileExt = path.extname(file);
        
        if (fileExt === '.jpg'){
            let pathFile = basePathDirectory + '/' + file;
            
            fs.stat(pathFile, function(err, stats){
                if (err) throw err;
                console.log(file);
                // console.log(`stats: ${JSON.stringify(stats)}`);
                // console.log(`File Data Last Modified: ${stats.mtime}`);
                paintAndCutFaces(pathFile);
            });
        }
    });
});

  
//   run()