import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {plainToClass} from 'class-transformer';
import {CONFIG_TOKEN} from '../../config/security';
import {CoreModule} from '../../core/core.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {WsAuthGuard} from './guard/ws.auth.guard';
import {JwtStrategy, JwtStrategyOptions} from './passport/jwt.strategy';
import {LocalStrategy} from './passport/local.strategy';

@Module({
	imports: [
		CoreModule,
		PassportModule.register({defaultStrategy: 'jwt'}),
		JwtModule.registerAsync({
			imports: [CoreModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					secret: config.get(CONFIG_TOKEN).jwt.secret,
					signOptions: {expiresIn: '10m'},
				};
			},
		}),
	],
	providers: [
		AuthService,
		LocalStrategy,
		{
			provide: JwtStrategyOptions,
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				const jwtSecret = config.get(CONFIG_TOKEN).jwt.secret;
				return plainToClass(JwtStrategyOptions, {jwtSecret});
			},
		},
		JwtStrategy,
		WsAuthGuard,
	],
	controllers: [
		AuthController,
	],
	exports: [
		AuthService,
		WsAuthGuard,
		JwtModule,
	],
})
export class AuthModule {
}
