import { Route } from '../../modules/router/route';
import { getStaticAssets } from '../../modules/shared/get-static-assets';

export class AssetsController extends Route {
    path = /^public\/[\w-\/]+(\.(ico|png|jpg|jpeg|js|css))$/;
    get(data, callback) {
        const trimmedAssetName = data.path;
        if (trimmedAssetName.length > 0) {
            // Read in the asset's data
            getStaticAssets(trimmedAssetName,function(err, filedata){
                if(!err && filedata){

                    // Determine the content type (default to plain text)
                    let contentType = 'plain';

                    if (trimmedAssetName.includes('.ico')) {
                        contentType = 'favicon';
                    }

                    if(trimmedAssetName.includes('.css')){
                        contentType = 'css';
                    }

                    if(trimmedAssetName.includes('.png')){
                        contentType = 'png';
                    }

                    if(trimmedAssetName.includes('.jpg') || trimmedAssetName.includes('.jpeg')){
                        contentType = 'jpg';
                    }

                    // Callback the data
                    callback(200, filedata, contentType);
                } else {
                    callback(404);
                }
            });
        } else {
            callback(404);
        }
    }
}