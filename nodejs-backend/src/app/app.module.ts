import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { TypeOrmModule } from './type-orm/type.orm.module';
import { ConfigModule } from './config/config.module';

const modules = [
  TypeOrmModule,
  ConfigModule,
  CoreModule,
];

@Module({
  imports: modules,
  exports: modules,
})
export class AppModule {
}
