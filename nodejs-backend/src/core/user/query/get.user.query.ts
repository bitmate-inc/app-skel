import {InjectRepository} from '@nestjs/typeorm';
import {plainToClass} from 'class-transformer';
import {Repository} from 'typeorm';
import {GetOneQueryData} from '../../../lib/entity/query/get.one.query';
import {User} from '../model/user.entity';

export class GetUserQueryData extends GetOneQueryData {
	id?: string;
}

export class GetUserQueryResult {
	user?: User;
}

export class GetUserQuery {
	constructor(
		@InjectRepository(User) protected readonly repository: Repository<User>,
	) {
	}

	async execute(data: GetUserQueryData): Promise<GetUserQueryResult> {
		const qb = this.repository.createQueryBuilder('user');

		if (!!data.id) {
			qb.andWhere('user.id = :id', {id: data.id});
		}

		// ---
		if (!data.withDeleted) {
			qb.andWhere('(user.deletedAt IS NULL OR user.deletedAt > NOW())');
		}

		if (!!data.orderBy) {
			for (const property of Object.keys(data.orderBy)) {
				const direction = data.orderBy[property];
				qb.addOrderBy(property, direction as ('ASC' | 'DESC'));
			}
		}

		const user = await qb.getOne();

		return plainToClass(GetUserQueryResult, {user});
	}
}
