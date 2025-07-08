'use strict';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const DOCUMENT_FOLDER_PATH = process.env.DOCUMENT_FOLDER_PATH;
const __dirname = DOCUMENT_FOLDER_PATH;

export default class DocumentRegistrator {

    constructor(app){
        this.app = app;
    }

    static downloadAndPlaceDocument(document_url, document_name) {
        return new Promise(async(resolve,reject)=>{ 
            try {
                const sanitizedDocumentName = document_name.replace(/[^a-zA-Z0-9-_]/g, '_');        
                console.log("DocumentRegistrator downloadAndPlaceDocument sanitizedDocumentName",sanitizedDocumentName);
                // Define paths

                const basePath = path.join(__dirname, sanitizedDocumentName);
                const inputPath = path.join(basePath, 'input');
                const outputPath = path.join(basePath, 'output');

                console.log("DocumentRegistrator basePath",basePath);
                console.log("DocumentRegistrator inputPath",inputPath);
                console.log("DocumentRegistrator outputPath",outputPath);

                // Create directories
                console.log("DocumentRegistrator creating directories");
                await fs.promises.mkdir(basePath, { recursive: true });
                await fs.promises.mkdir(inputPath, { recursive: true });
                await fs.promises.mkdir(outputPath, { recursive: true });

                // Download file from URL
                console.log("DocumentRegistrator downloading file from URL");
                const response = await axios({
                    method: 'GET',
                    url: document_url,
                    responseType: 'stream',
                    timeout: 30000 // 30 second timeout
                });

                console.log("DocumentRegistrator response",response);
                // Extract filename from URL or use a default
                const urlPath = new URL(document_url).pathname;
                console.log("DocumentRegistrator urlPath",urlPath);
                const fileName = path.basename(urlPath) || 'document';
                console.log("DocumentRegistrator fileName",fileName);
                const filePath = path.join(inputPath, fileName);
                console.log("DocumentRegistrator filePath",filePath);
                // Save the file
                console.log("DocumentRegistrator creating writer");
                const writer = fs.createWriteStream(filePath);
                console.log("DocumentRegistrator piping response to writer");
                response.data.pipe(writer);

                console.log("DocumentRegistrator waiting for writer to finish");

                writer.on('finish', (data)=>{
                    console.log("DocumentRegistrator writer finished",data);
                    return resolve(true);
                });
                writer.on('error', (error)=>{
                    console.log("DocumentRegistrator writer error",error);
                    return reject(error);
                });

            } catch (error) {
                console.error('DocumentRegistrator downloadAndPlaceDocument error:', error);
                    return reject(error);
                }
            });
    }
}
