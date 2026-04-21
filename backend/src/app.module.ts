import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlantsModule } from './plants/plants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PlantsModule,
  ],
})
export class AppModule {}
