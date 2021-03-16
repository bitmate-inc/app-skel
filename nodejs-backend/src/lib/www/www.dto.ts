import { plainToClass, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../entity/query/query.dto';

export class GetListRequestQueryParamsDto {

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit?: number;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	offset?: number;

	@IsOptional()
	@IsString()
	q?: string;


	get pagination() {
		if (!this.limit && !this.offset) {
			return undefined;
		}

		return plainToClass(PaginationDto, {
			limit: this.limit,
			offset: this.offset,
		});
	}
}
