import {PaginationDto} from './dto/pagination.dto';

export class GetListQueryData {
	orderBy?: { [propertyPath: string]: 'asc' | 'desc' };
	pagination?: PaginationDto;
	include?: { [propertyPath: string]: 'asc' | 'desc' };
	withDeleted?: boolean;
}
