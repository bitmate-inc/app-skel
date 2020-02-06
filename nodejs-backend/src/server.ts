import { NestFactory } from '@nestjs/core';
import { WwwModule } from './www/www.module';
import { ConfigService } from '@nestjs/config';
import { CONFIG_TOKEN } from './config/http';

async function bootstrap() {
  const app = await NestFactory.create(WwwModule);
  const options = app.get(ConfigService).get(CONFIG_TOKEN);

  app.enableCors(options.cors);

  await app.listen(options.server.port);
}

bootstrap();
