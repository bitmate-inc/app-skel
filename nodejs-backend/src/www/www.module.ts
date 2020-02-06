import { Module } from '@nestjs/common';
import { AppModule } from '../app/app.module';

@Module({
  imports: [
    AppModule,
  ],
  controllers: [],
})
export class WwwModule {
}
