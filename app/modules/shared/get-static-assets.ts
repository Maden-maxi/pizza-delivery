import { readFile } from 'fs';
import { ROOT_DIR } from '../../../config/constants';

export function getStaticAssets(fileName,callback) {
    fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if(fileName){
        readFile(ROOT_DIR + fileName, function(err,data){
            if(!err && data){
                callback(false,data);
            } else {
                callback('No file could be found');
            }
        });
    } else {
        callback('A valid file name was not specified');
    }
}