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


    // static downloadAndPlaceDocument(document_url, document_name) {
    //     return new Promise(async(resolve,reject)=>{ 
    //         try {
    //                 try {
    //                   // Write text to a file
    //                   await fs.writeFile('myfile.txt', 'Hello, World!', 'utf8');
                  
    //                   // Write JSON data
    //                   const data = { name: 'John', age: 30, city: 'New York' };
    //                   await fs.writeFile(`data.json`, JSON.stringify(data, null, 2), 'utf8');
                  
    //                   console.log('Files created successfully');
    //                 } catch (err) {
    //                   console.error('Error writing files:', err);
    //                 }
    //         } catch (error) {
    //             console.error('DocumentRegistrator downloadAndPlaceDocument error:', error);
    //             return reject(error);
    //         }
    //     })
    // }


    static downloadAndPlaceDocument2(document_url, document_name) {
        return new Promise(async(resolve,reject)=>{ 
            try {
                const sanitizedDocumentName = document_name.replace(/[^a-zA-Z0-9-_]/g, '_');        
                console.log("DocumentRegistrator downloadAndPlaceDocument sanitizedDocumentName",sanitizedDocumentName);
                // Define paths

                const basePath = path.join(__dirname, sanitizedDocumentName);
                const inputPath = path.join(basePath, 'input');
                const outputPath = path.join(basePath, 'output');

                const data = { name: 'John', age: 30, city: 'New York' };
                await fs.writeFile(`${inputPath}/data.json`, JSON.stringify(data, null, 2), 'utf8');
                console.log("DocumentRegistrator data.json written successfully");

                // console.log("DocumentRegistrator basePath",basePath);
                // console.log("DocumentRegistrator inputPath",inputPath);
                // console.log("DocumentRegistrator outputPath",outputPath);

                // // Create directories synchronously
                // console.log("DocumentRegistrator creating directories");
                // fs.mkdirSync(basePath, { recursive: true });
                // fs.mkdirSync(inputPath, { recursive: true });
                // fs.mkdirSync(outputPath, { recursive: true });

                // // Download file from URL
                // console.log("DocumentRegistrator downloading file from URL");
                // const response = await axios({
                //     method: 'GET',
                //     url: document_url,
                //     responseType: 'arraybuffer',
                //     timeout: 30000 // 30 second timeout
                // });

                // console.log("DocumentRegistrator response received");
                // // Extract filename from URL or use a default
                // const urlPath = new URL(document_url).pathname;
                // console.log("DocumentRegistrator urlPath",urlPath);
                // const fileName = path.basename(urlPath) || 'document';
                // console.log("DocumentRegistrator fileName",fileName);
                // const filePath = path.join(inputPath, fileName);
                // console.log("DocumentRegistrator filePath",filePath);
                
                // // Save the file synchronously
                // console.log("DocumentRegistrator writing file synchronously");
                // let result = fs.writeFileSync(filePath, response.data);
                // console.log("DocumentRegistrator result",result);
                
                return resolve(true);
                
            } catch (error) {
                console.error('DocumentRegistrator downloadAndPlaceDocument error:', error);
                return reject(error);
            }
        });
    }
}
