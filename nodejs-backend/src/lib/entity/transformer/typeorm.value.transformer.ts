import { FindOperator, ValueTransformer } from 'typeorm';

export class TypeormValueTransformer<DbValue, EntityValue> implements ValueTransformer {

	constructor(
		private readonly transformer: ValueTransformer,
	) {
	}

	from(value?: DbValue) {
		return this.transformer.from(value);
	}

	to(value: EntityValue | FindOperator<any>) {
		return value instanceof FindOperator ? value : this.transformer.to(value);
	}
}
