import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PackageModule } from './package/package.module';

@Module({
  imports: [ConfigModule.forRoot(), PackageModule],
})
export class AppModule {}
