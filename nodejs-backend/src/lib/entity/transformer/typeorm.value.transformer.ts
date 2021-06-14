import { FindOperator, ValueTransformer } from 'typeorm';

/*
 * Handles FindOperator values passed in transformer until following BUG gets fixed
 * https://github.com/typeorm/typeorm/issues/4399
 *
 * TODO: check if the bug is fixed
 */
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
