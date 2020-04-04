import { Module } from '@nestjs/common';
import { TypeOrmModule } from './type-orm/type.orm.module';
import { ConfigModule } from './config/config.module';
import { DebugModule } from './debug/debug.module';

const modules = [
  ConfigModule,
  TypeOrmModule,
  DebugModule,
];

@Module({
  imports: modules,
  exports: modules,
})
export class CoreModule {
}
