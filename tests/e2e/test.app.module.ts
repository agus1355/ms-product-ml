import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testDataSource } from './test-data-source';
import { SeedModule } from 'src/infrastructure/inversion-of-control/seed.module';

@Module({
  imports: [
    SeedModule,
    TypeOrmModule.forRoot(testDataSource.options),
    TypeOrmModule.forFeature([/*HERE ENTITIES*/])
  ],
})
export class TestAppModule {}
