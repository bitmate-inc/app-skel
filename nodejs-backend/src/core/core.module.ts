import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { DebugModule } from './infrastructure/debug/debug.module';
import { MinioModule } from './infrastructure/minio/minio.module';
import { NodemailerModule } from './infrastructure/nodemailer/nodemailer.module';
import { RoutingModule } from './infrastructure/routing/routing.module';
import { TemplateModule } from './infrastructure/template/template.module';
import { TypeOrmModule } from './infrastructure/type-orm/type.orm.module';
import { UserModule } from './domain/user/user.module';

const modules = [
	/*
	 * App
	 */
	ConfigModule,
	TypeOrmModule,
	DebugModule,
	NodemailerModule,
	TemplateModule,
	RoutingModule,
	MinioModule,
	/*
	 * Domain
	 */
	AuthModule,
	UserModule,
];

@Module({
	imports: modules,
	exports: modules,
})
export class CoreModule {
}
