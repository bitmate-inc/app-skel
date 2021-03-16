import { IncludeDto, OrderByDto, PaginationDto } from './query.dto';

export class GetListQueryData {
	orderBy?: OrderByDto;
	pagination?: PaginationDto;
	include?: IncludeDto;
	withDeleted?: boolean;
}
