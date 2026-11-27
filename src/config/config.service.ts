import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from "dotenv";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };
    constructor() {
        const env =process.env.NODE_ENV || 'development';
        const envFilePath = `${__dirname}/../../.env.${env}`

        const existsPath = fs.existsSync(envFilePath);
            if(!existsPath) {
                console.log(`${envFilePath} file does not exist`);
                process.exit(0);
            }
            this.envConfig = parse(fs.readFileSync(envFilePath));
    
        const  isDevelopmentEnv = process.env.NODE_ENV !== 'production';
        if(isDevelopmentEnv) {
            const envFilePath = process.cwd() + '/.env.development';
            const existsPath = fs.existsSync(envFilePath);
            if(!existsPath) {
                console.log('.env.development file does not exist');
                process.exit(0);
            }
            this.envConfig = parse(fs.readFileSync(envFilePath));
        }
        else
        {
            const envFilePath = process.cwd() + '/.env.production';
            const existsPath = fs.existsSync(envFilePath);
            if(!existsPath) {
                console.log('.env.production file does not exist');
                process.exit(0);
            }
            this.envConfig = parse(fs.readFileSync(envFilePath));
        }
    }
    get(key: string): string {
        return this.envConfig[key];
    }
}