export interface FindOneQuery {
	id?: string;

	[property: string]: any | any[];
}

export interface FindListQuery {
	id?: string[];

	[property: string]: any | any[];
}

export interface FindBulkQuery extends FindListQuery {
	selectAll?: boolean;
}

export interface FindOptions {
	relations?: string[];
	skip?: number;
	take?: number;
}

export interface EntityRepositoryInterface<Entity> {
	findOneBy(query: FindOneQuery, options?: FindOptions): Promise<Entity | undefined>;

	findBy(query: FindListQuery, options?: FindOptions): Promise<Entity[]>;

	findByAndCount(query: FindListQuery, options?: FindOptions): Promise<[Entity[], number]>;

	findBulkBy(query: FindBulkQuery, options?: FindOptions): Promise<Entity[]>;

	findBulkByAndCount(query: FindBulkQuery, options?: FindOptions): Promise<[Entity[], number]>;

	save(entity: Entity): Promise<Entity>;

	saveBatch(entityList: Entity[]): Promise<Entity[]>;

	remove(entity: Entity): Promise<Entity>;

	removeBatch(entityList: Entity[]): Promise<Entity[]>;
}
