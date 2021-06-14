import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { CommandModule } from 'nestjs-command';

@Module({
	imports: [
		CommandModule,
		CoreModule,
	],
	providers: [],
})
export class CliModule {
}
