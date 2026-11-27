import { DataSource } from 'typeorm';
import { ConfigService } from '../config/config.service.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION_POSTGRES',
    inject: [ConfigService],
    useFactory:(config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: config.get('HOST') || 'localhost',
        port: +config.get('PORT_DB'),
        username: config.get('USERNAME') || 'root',
        password: config.get('PASSWORD') || 'prueba',
        database: config.get('DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });
      
      return dataSource.initialize();
    },
  },
];