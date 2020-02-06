import {ClassSerializerInterceptor, UnprocessableEntityException, ValidationPipe} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory, Reflector} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {json} from 'express';
import {CONFIG_TOKEN} from './config/http';
import {ValidationResult} from './lib/validator/model/validation.result';
import {WwwModule} from './www/www.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(WwwModule);
	const options = app.get(ConfigService).get(CONFIG_TOKEN);

	app.enableCors(options.cors);
	app.use(json({limit: '50mb'}));
	app.set('trust proxy', options.server.trustProxy);

	const reflector = app.get(Reflector);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		exceptionFactory: errorList => new UnprocessableEntityException(
			ValidationResult.createFromErrorList(errorList),
		),
	}));

	await app.listen(options.server.port);
}

// tslint:disable-next-line:no-console
bootstrap().catch(console.error);
