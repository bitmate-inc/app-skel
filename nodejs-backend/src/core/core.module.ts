import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const modules = [
  ConfigModule.forRoot({
    load: [],
  }),
];

@Module({
  imports: modules,
  exports: modules,
})
export class CoreModule {
}
