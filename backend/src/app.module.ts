import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TableModule,
  ],
})
export class AppModule {}
