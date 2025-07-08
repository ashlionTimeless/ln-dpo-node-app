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

                // Create directories
                await fs.promises.mkdir(basePath, { recursive: true });
                await fs.promises.mkdir(inputPath, { recursive: true });
                await fs.promises.mkdir(outputPath, { recursive: true });

                // Download file from URL
                const response = await axios({
                    method: 'GET',
                    url: document_url,
                    responseType: 'stream',
                    timeout: 30000 // 30 second timeout
                });

                // Extract filename from URL or use a default
                const urlPath = new URL(document_url).pathname;
                const fileName = path.basename(urlPath) || 'document';
                const filePath = path.join(inputPath, fileName);

                // Save the file
                const writer = fs.createWriteStream(filePath);
                response.data.pipe(writer);

                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });
                return resolve(true);
            } catch (error) {
                console.error('DocumentRegistrator downloadAndPlaceDocument error:', error);
                    return reject(error);
                }
            });
    }
}
