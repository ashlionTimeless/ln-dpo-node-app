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

    static downloadAndPlaceDocument(document_url,filepath) {
        return new Promise(async(resolve,reject)=>{ 
            try {

                // Download file from URL
                const response = await axios({
                    method: 'GET',
                    url: document_url,
                    responseType: 'stream',
                    timeout: 30000 // 30 second timeout
                });

                // Save the file
                const writer = fs.createWriteStream(filepath);
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
