import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { Package } from './package.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'yourusername',
      password: process.env.DATABASE_PASSWORD || 'yourpassword',
      database: process.env.DATABASE_NAME || 'yourdatabase',
      entities: [Package],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Package]),
  ],
  providers: [PackageService],
  controllers: [PackageController],
})
export class PackageModule {}
