import {Exclude} from 'class-transformer';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User {

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@CreateDateColumn({
		type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',
		select: false,
	})
	@Exclude()
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',
		select: false,
	})
	@Exclude()
	updatedAt: Date;

	@Column({
		type: 'timestamptz',
		nullable: true,
		select: false,
	})
	@Exclude()
	deletedAt?: Date;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({
		transformer: {
			from: (value?: string) => !!value ? value.toLowerCase() : value,
			to: (value: string) => !!value ? value.toLowerCase() : value,
		},
		unique: true,
	})
	email: string;

	@Column({
		select: false,
	})
	@Exclude({toPlainOnly: true})
	password: string;

	@Column({
		nullable: true,
		select: false,
	})
	@Exclude({toPlainOnly: true})
	confirmationToken: string;

	@Column({nullable: true, type: 'text'})
	imageUrl?: string;
}
