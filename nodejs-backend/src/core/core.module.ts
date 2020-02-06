import {Module} from '@nestjs/common';
import {ConfigModule} from './config/config.module';
import {DebugModule} from './debug/debug.module';
import {NodemailerModule} from './nodemailer/nodemailer.module';
import {TemplateModule} from './template/template.module';
import {TypeOrmModule} from './type-orm/type.orm.module';
import {UserModule} from './user/user.module';

const modules = [
	ConfigModule,
	TypeOrmModule,
	DebugModule,
	NodemailerModule,
	TemplateModule,
	UserModule,
];

@Module({
	imports: modules,
	exports: modules,
})
export class CoreModule {
}
