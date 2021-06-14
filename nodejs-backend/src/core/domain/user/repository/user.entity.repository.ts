import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { FindOneQuery, FindOptions } from '../../../../lib/entity/repository/entity.repository.interface';
import { TypeOrmEntityRepository } from '../../../../lib/entity/repository/type.orm.entity.repository';
import { User } from '../model/user.entity';

export interface FindOneUserQuery extends FindOneQuery {
	email?: string;
	passwordResetToken?: string;
}

export class UserEntityRepository extends TypeOrmEntityRepository<User> {

	constructor(
		@InjectRepository(User) protected readonly repository: Repository<User>,
	) {
		super();
	}

	async findOneBy(query: FindOneUserQuery, options?: FindOptions): Promise<User | undefined> {
		const innerQuery: FindOneQuery = { ...query };

		if ('email' in query) {
			innerQuery.email = Raw(alias => `LOWER(${alias}) = ':email'`, { email: query.email.toLowerCase() });
		}

		return super.findOneBy(query, options);
	}

	async findOneForAuth(query: { email: string } | { id: string }): Promise<User | undefined> {
		const qb = this.repository.createQueryBuilder('user');

		qb.addSelect('user.password');

		if ('email' in query) {
			qb.where('LOWER(user.email) = :email', { email: query.email.toLowerCase() });
		} else if ('id' in query) {
			qb.where('user.id = :id', { id: query.id });
		} else {
			return undefined;
		}

		return qb.getOne();
	}
}
