import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service.js';
import { CategoriaController } from './categoria.controller.js';
import { categoriaProvider } from './categoria.provider.js';
import { DatabaseModule } from '../../database/database.module.js';


@Module({
  imports: [DatabaseModule],
  controllers: [CategoriaController],
  providers: [CategoriaService, ...categoriaProvider],
})
export class CategoriaModule {}
