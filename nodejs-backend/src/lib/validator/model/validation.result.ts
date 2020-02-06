import {plainToClass} from 'class-transformer';
import {ValidationError} from 'class-validator';

export class ValidationResult {
	errorList?: ValidationError[];
	errorMessage?: string;

	static create(data: Partial<ValidationResult> = {}) {
		return plainToClass(ValidationResult, data);
	}

	static createFromErrorList(errorList: ValidationResult['errorList']) {
		return ValidationResult.create({errorList});
	}

	static createFromErrorMessage(errorMessage: ValidationResult['errorMessage']) {
		return ValidationResult.create({errorMessage});
	}
}
