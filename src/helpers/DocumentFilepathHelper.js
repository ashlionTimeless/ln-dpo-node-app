import path from "path";
import fs from "fs";
import axios from "axios";

class DocumentFilepathHelper {
    static async composeFilepath(document_url,document_name){
        return new Promise(async(resolve,reject)=>{
            try{
                const sanitizedDocumentName = document_name.replace(/[^a-zA-Z0-9-_]/g, '_');        
                console.log("DocumentRegistrator downloadAndPlaceDocument sanitizedDocumentName",sanitizedDocumentName);
                // Define paths
                const basePath = path.join(__dirname, sanitizedDocumentName);
                const inputPath = path.join(basePath, 'input');
                const outputPath = path.join(basePath, 'output');
        
                // Create directories
                await fs.promises.mkdir(basePath, { recursive: true });
                await fs.promises.mkdir(inputPath, { recursive: true });
                await fs.promises.mkdir(outputPath, { recursive: true });
        
        
                // Extract filename from URL or use a default
                const urlPath = new URL(document_url).pathname;
                const fileName = path.basename(urlPath) || 'document';
                const filePath = path.join(inputPath, fileName);

                let result = {
                    "basePath":basePath,
                    "inputPath":inputPath,
                    "outputPath":outputPath,
                    "filePath":filePath
                }

                return resolve(result);
            }catch(error){
                reject(error);
            }
        })
    }

}

export default DocumentFilepathHelper;