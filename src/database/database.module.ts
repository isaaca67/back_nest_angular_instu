import { Module } from '@nestjs/common';
import { databaseProvider } from './database.providers.js';
import { ConfigService } from '../config/config.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({

        type: 'postgres',
        host:config.get('HOST') || 'localhost',
        port: +config.get('PORT_DB'),
        username: config.get('USERNAME') || 'postgres',
        password: config.get('PASSWORD') || 'prueba',
        database: config.get('DATABASE'),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],

      }),
    }),
  ],
  providers: [...databaseProvider, ConfigService],
  exports: [...databaseProvider],
})
export class DatabaseModule {
}