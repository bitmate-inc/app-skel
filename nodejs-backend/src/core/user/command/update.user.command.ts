import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {IsOptional, IsString, validate} from 'class-validator';
import {ValidationResult} from '../../../lib/validator/model/validation.result';
import {User} from '../model/user.entity';
import {UserEntityRepository} from '../repository/user.entity.repository';

export class UpdateUserCommandData implements Partial<User> {
	@IsString()
	@IsOptional()
	firstName: string;

	@IsString()
	@IsOptional()
	lastName: string;

	@IsOptional()
	@IsString()
	imageUrl?: string;
}

export class UpdateUserCommandResult {
	user?: User;
	validationResult?: ValidationResult;
}

@Injectable()
export class UpdateUserCommand {

	constructor(
		private readonly userRepository: UserEntityRepository,
	) {
	}

	async execute(user: User, data: UpdateUserCommandData): Promise<UpdateUserCommandResult> {
		const validationResult = await this.validate(data);

		if (!!validationResult) {
			return plainToClass(UpdateUserCommandResult, {validationResult});
		}

		if (!!data.firstName) {
			user.firstName = data.firstName;
		}
		if (!!data.lastName) {
			user.lastName = data.lastName;
		}
		if (!!data.imageUrl) {
			user.imageUrl = data.imageUrl;
		}

		user = await this.userRepository.save(user);
		delete user.password;

		return plainToClass(UpdateUserCommandResult, {user});
	}

	async validate(data: UpdateUserCommandData): Promise<ValidationResult | undefined> {
		const result = await validate(data);

		if (result.length > 0) {
			return ValidationResult.create({errorList: result});
		}

		return undefined;
	}

}
