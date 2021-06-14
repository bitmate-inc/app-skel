import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TypeormValueTransformer } from '../../../../lib/entity/transformer/typeorm.value.transformer';

@Entity()
export class User {

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ApiHideProperty()
	@Exclude()
	@CreateDateColumn({
		type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',
		select: false,
	})
	createdAt: Date;

	@ApiHideProperty()
	@Exclude()
	@UpdateDateColumn({
		type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',
		select: false,
	})
	updatedAt: Date;

	@ApiHideProperty()
	@Exclude()
	@Column({
		type: 'timestamptz',
		nullable: true,
		select: false,
	})
	deletedAt?: Date;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({
		/*
		 * It is necessary to use TypeormValueTransformer so that FindOperator gets handled properly.
		 * because of following BUG in TypeORM:
		 * https://github.com/typeorm/typeorm/issues/4399
		 */
		transformer: new TypeormValueTransformer({
			from: (value?: string) => value?.toLowerCase(),
			to: (value?: string) => value?.toLowerCase(),
		}),
		unique: true,
	})
	email: string;

	@ApiHideProperty()
	@Exclude({ toPlainOnly: true })
	@Column({
		select: false,
	})
	password: string;

	@ApiHideProperty()
	@Exclude({ toPlainOnly: true })
	@Column({
		nullable: true,
		select: false,
	})
	passwordResetToken: string;

	@Column({ nullable: true, type: 'text' })
	imageUrl?: string;
}
