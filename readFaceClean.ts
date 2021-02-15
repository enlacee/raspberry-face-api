import { paintAndCutFace } from './acLibrary/paintAndCuteFace';

const PATH = require('path');
const FS = require('fs');
const IMAGE_PATH = './imagesToRead';

var directoryPath = PATH.join(__dirname, IMAGE_PATH);

/*
* Read path directory and find images
*/
FS.readdir(directoryPath, function(err, files) {
    // handing error
    if (err) throw err;

    files.forEach(function(file){
        // list whatever you want to do with this files
        if (PATH.extname(file) === '.jpg') {
            let pathFile = IMAGE_PATH + '/' + file;
            FS.stat(pathFile, function(err, stats) {
                if (err) throw err;
                console.log(file);
                // console.log(`stats: ${JSON.stringify(stats)}`);
                // console.log(`File Data Last Modified: ${stats.mtime}`);
                paintAndCutFace(pathFile);
            });
        }
    });
});
