import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';

export const FilterSerializers = {
    not_like: {
        operator: 'not_like'
    },
    like: {
        operator: 'like',
        serialize (val) {
            return ['%', val, '%'].join('');
        }
    },
    starts_with: {
        operator: 'like',
        serialize (val) {
            return [val, '%'].join('');
        }
    },
    ends_with: {
        operator: 'like',
        serialize (val) {
            return ['%', val].join('');
        }
    },
    equals: {
        operator: 'equals'
    },
    not_equal_to: {
        operator: 'not_equal_to'
    },
    greater_than: {
        operator: '>',
        serialize (val) {
            return parseFloat(val);
        }
    },
    less_than: {
        operator: '<',
        serialize (val) {
            return parseFloat(val);
        }
    },
    before: {
        operator: '<'
    },
    after: {
        operator: '>'
    }
};

/**
 * @module {can.Map} can-restless.FilterMap
 * @parent can-restless
 */
export const FilterMap = DefineMap.extend('Filter', {
    /**
     * @prototype
     */
    /**
     * Name of the field to filter on.
     * @property {String} can-restless.FilterMap.name
     */
    name: {
        type: 'string',
        value: ''
    },
    /**
     * The operator to filter on. The default operator is `like`.
     * @property {String}
     */
    operator: {
        serialize: false,
        value: 'like'
    },
    /**
     * The value to filter by.
     */
    value: {
        serialize: false
    },
    /*
     * The operator to filter with. This value is retrieved internally and
     * serialized for flask restless.
     */
    op: {
        type: 'string',
        serialize () {
            if (!this.value) {
                return 'is_null';
            }
            let val = this.operator;
            const op = FilterSerializers[val];
            if (op) {

                //convert the filter operator into a flask restless compatible operator
                val = op.operator;
            }
            return val;
        }
    },
    /*
     * The value to filter by. This value is retrieved internally and
     * serialized for flask-restless
     */
    val: {
        serialize () {
            const val = this.value;
            if (val && this.operator) {
                const op = FilterSerializers[this.operator];
                if (op && op.serialize) {
                    return op.serialize(val);
                }
            }
            return val;
        }
    }
});

/*
 * A list of filters
 */
export const FilterList = DefineList.extend('FilterList', {
    '#': FilterMap
});

/**
 * @module {can.Map} can-restless/lib/CanRestless.SortMap SortMap
 * @parent can-restless
 * @group props Properties
 * @description
 * A sorting helper class
 */
export const SortMap = DefineMap.extend('Sort', {
    /**
     * The name of the field to sort on
     * @property {String} SortMap.props.fieldName
     * @parent SortMap.props
     */
    fieldName: {type: 'string', value: ''},
    /**
     * The type of sorting. This can be either `asc` or `desc`
     * @property {String} SortMap.props.type
     * @parent SortMap.props
     */
    type: {type: 'string', value: 'asc'}
});

/**
 * @module {can.Map} can-restless/lib/CanRestless.ParameterMap ParameterMap
 * @parent can-restless
 * @group props Properties
 * @description A set of parameters that serializes to valid json api parameters
 * that allow querying, filtering, and sorting on the flask-restless api resource
 */
export const ParameterMap = DefineMap.extend('Parameter', {
    /**
     * @prototype
     */
    /**
     * A sort parameter.
     * @property {SortMap} ParameterMap.props.sort
     * @parent ParameterMap.props
     */
    sort: {
        Type: SortMap,
        serialize (sort) {
            console.log(sort);
            if (!sort) {
                return undefined;
            }
            const field = sort.fieldName;
            if (!field) {
                return undefined;
            }
            return sort.type === 'asc' ? field : '-' + field;
        }
    },
    /**
     * An array of filters
     * @property {Array<FilterMap>} ParameterMap.props.filters
     * @parent ParameterMap.props
     */
    filters: {
        Type: FilterList,
        Value: FilterList,
        serialize: false
    },
    /**
     * The current page number index. The default is 0. Flaks-restless actually
     * uses the page number, not the index, so when this is serialized, it is
     * incremented internally.
     * @property {Number} ParameterMap.props.page
     * @parent ParameterMap.props
     */
    page: {
        type: 'number',
        value: 0,
        serialize: false
    },
    /**
     * The number of results per page to retrieve. The default is 10
     * @property {Number} ParameterMap.props.perPage
     * @parent ParameterMap.props
     */
    perPage: {
        type: 'number',
        value: 10,
        serialize: false
    },
    /*
     * An internal filters value that is serialized to flask-restless
     */
    'filter[objects]': {
        serialize () {
            const filters = this.filters;
            if (filters && filters.length) {
                //if there are filters in the list, set the filter parameter
                return JSON.stringify(filters.filter((f) => {
                    return Boolean(f.value);
                }).serialize());
            } else {
                //don't include the filter parameter
                return undefined;
            }
        }
    },
    /*
     * An internal page number value that is serialized to flask-restless
     */
    'page[number]': {
        serialize () {
            //if page is truthy (greater than 0) we serialize it
            if (this.page) {
                return this.page + 1;
            }
            //otherwise skip
            return undefined;
        }
    },
    /*
     * An internal  value of the number of results to fetch per page
     * that is serialized to flask-restless
     */
    'page[size]': {
        serialize () {
            if (this.perPage !== 10) {
                return this.perPage;
            }
            return undefined;
        }
    }
});

export default ParameterMap;
