import {Module} from '@nestjs/common';
import {ConfigModule as NestConfigModule} from '@nestjs/config';
import http from 'src/config/http';
import debug from '../../config/debug';
import nodemailer from '../../config/nodemailer';
import security from '../../config/security';

const configuration = [
	http, debug, security, nodemailer,
];

const modules = [
	NestConfigModule.forRoot({
		load: configuration,
	}),
];

@Module({
	imports: modules,
	exports: modules,
})
export class ConfigModule {
}
