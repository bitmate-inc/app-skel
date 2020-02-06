import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {Command, Positional} from 'nestjs-command';
import {CreateUserCommand, CreateUserCommandData} from '../command/create.user.command';

@Injectable()
export class UserCli {

	constructor(
		private readonly createUserCommand: CreateUserCommand,
	) {
	}

	@Command({
		command: 'user:create <email> <firstName> <lastName> <password>',
		describe: 'create a user',
		autoExit: true,
	})
	async createUser(
		@Positional({
			name: 'email',
			type: 'string',
		}) email: string,
		@Positional({
			name: 'firstName',
			type: 'string',
		}) firstName: string,
		@Positional({
			name: 'lastName',
			type: 'string',
		}) lastName: string,
		@Positional({
			name: 'password',
			type: 'string',
		}) password: string,
	) {
		const commandData = plainToClass(CreateUserCommandData, {
			email, firstName, lastName, plainPassword: password,
		});
		
		const result = await this.createUserCommand.execute(commandData);

		if (result.validationResult) {
			console.error(result.validationResult);
		}
	}

}
