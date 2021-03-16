import { ClassSerializerInterceptor, Module, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';
import { CoreModule } from '../../core/core.module';
import { ValidationResult } from '../../lib/validator/model/validation.result';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		CoreModule,
		AuthModule,
		UserModule,
	],
	providers: [
		{
			provide: APP_PIPE,
			useFactory: () => {
				return new ValidationPipe({
					transform: true,
					whitelist: true,
					exceptionFactory: errorList => new UnprocessableEntityException(
						ValidationResult.createFromErrorList(errorList),
					),
				});
			},
		},
		{
			provide: APP_INTERCEPTOR,
			inject: [Reflector],
			useFactory: (reflector: Reflector) => {
				return new ClassSerializerInterceptor(reflector);
			},
		},
	],
})
export class WwwModule {
}
