import {Body, Controller, Get, Post, UnprocessableEntityException, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {plainToClass} from 'class-transformer';
import {UpdateUserCommand, UpdateUserCommandData} from '../../core/user/command/update.user.command';
import {User} from '../../core/user/model/user.entity';
import {GetUserQuery} from '../../core/user/query/get.user.query';
import {AuthUser} from '../auth/auth.decorator';

@Controller('user')
export class UserController {

	constructor(
		private readonly getUserQuery: GetUserQuery,
		private readonly updateUserCommand: UpdateUserCommand,
	) {
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	async getOwnUser(
		@AuthUser() me: User,
	) {
		return {user: me};
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('me')
	async updateOwnUser(
		@AuthUser() me: User,
		@Body() userDto: object,
	) {
		const commandData = plainToClass(UpdateUserCommandData, userDto);
		const commandResult = await this.updateUserCommand.execute(me, commandData);

		if (!!commandResult.validationResult) {
			throw new UnprocessableEntityException(commandResult.validationResult);
		}
		return commandResult;
	}

}
