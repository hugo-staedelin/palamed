import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as dotEnv from 'dotenv';
import * as fs from 'fs';

type envNames =
  | 'MYSQL_HOST'
  | 'MYSQL_PORT_INTERN'
  | 'MYSQL_PORT_EXTERN'
  | 'MYSQL_USER'
  | 'MYSQL_PASSWORD'
  | 'MYSQL_DATABASE'
  | 'NODE_URL'
  | 'NODE_PORT_INTERN'
  | 'NODE_PORT_EXTERN'
  | string;

const ENV_CONFIGS = [
  {
    folder: 'mysql',
    key: 'MYSQL_ENV',
  },
  {
    folder: 'node',
    key: 'NODE_ENV',
  },
];

@Injectable()
export class TypeOrmConfigService {
  private readonly envConfig: { [key in envNames]: string };

  constructor() {
    this.envConfig = process.env;

    if (!process.env.ENV_LOAD) {
      const DEFAULT_ENV_FILE = path.resolve(__dirname, `../../.env`);
      Object.assign(this.envConfig, dotEnv.parse(fs.readFileSync(DEFAULT_ENV_FILE)));
      for (const { folder, key } of ENV_CONFIGS) {
        const ENV_FOLDER = `../../env/${folder}`;
        const ENV_FILE = path.resolve(__dirname, ENV_FOLDER, `${process.env[key] || ''}.env`);
        Object.assign(this.envConfig, dotEnv.parse(fs.readFileSync(ENV_FILE)));
      }
    }
  }

  get(key: envNames): string {
    return this.envConfig[key];
  }
}
