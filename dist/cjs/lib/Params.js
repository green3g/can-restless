/*lib/Params*/
'use strict';
var $__can_47_map_47___, $__can_47_list_47___, $__can_47_map_47_define_47___;
var CanMap = ($__can_47_map_47___ = require('can/map/map'), $__can_47_map_47___ && $__can_47_map_47___.__esModule && $__can_47_map_47___ || { default: $__can_47_map_47___ }).default;
var List = ($__can_47_list_47___ = require('can/list/list'), $__can_47_list_47___ && $__can_47_list_47___.__esModule && $__can_47_list_47___ || { default: $__can_47_list_47___ }).default;
$__can_47_map_47_define_47___ = require('can/map/define/define'), $__can_47_map_47_define_47___ && $__can_47_map_47_define_47___.__esModule && $__can_47_map_47_define_47___ || { default: $__can_47_map_47_define_47___ };
var FilterSerializers = {
    not_like: { operator: 'not_like' },
    like: {
        operator: 'like',
        serialize: function (val) {
            return [
                '%',
                val,
                '%'
            ].join('');
        }
    },
    starts_with: {
        operator: 'like',
        serialize: function (val) {
            return [
                val,
                '%'
            ].join('');
        }
    },
    ends_with: {
        operator: 'like',
        serialize: function (val) {
            return [
                '%',
                val
            ].join('');
        }
    },
    equals: { operator: 'equals' },
    not_equal_to: { operator: 'not_equal_to' },
    greater_than: {
        operator: '>',
        serialize: function (val) {
            return parseFloat(val);
        }
    },
    less_than: {
        operator: '<',
        serialize: function (val) {
            return parseFloat(val);
        }
    },
    before: { operator: '<' },
    after: { operator: '>' }
};
var FilterMap = CanMap.extend({
    define: {
        name: {
            type: 'string',
            value: ''
        },
        operator: {
            serialize: false,
            value: 'like'
        },
        value: { serialize: false },
        op: {
            type: 'string',
            serialize: function () {
                var val = this.attr('operator');
                var op = FilterSerializers[val];
                if (op) {
                    val = op.operator;
                }
                return val;
            }
        },
        val: {
            serialize: function () {
                var val = this.attr('value');
                if (val && this.attr('operator')) {
                    var op = FilterSerializers[this.attr('operator')];
                    if (op && op.serialize) {
                        return op.serialize(val);
                    }
                }
                return val;
            }
        }
    }
});
var FilterList = List.extend({ 'Map': FilterMap }, {});
var SortMap = CanMap.extend({
    fieldName: null,
    type: 'asc'
});
var ParameterMap = CanMap.extend({
    define: {
        sort: {
            Type: SortMap,
            serialize: function (sort) {
                if (!sort) {
                    return;
                }
                var field = sort.attr('fieldName');
                if (!field) {
                    return;
                }
                return sort.attr('type') === 'asc' ? field : '-' + field;
            }
        },
        filters: {
            Type: FilterList,
            Value: FilterList,
            serialize: false
        },
        page: {
            type: 'number',
            value: 0,
            serialize: false
        },
        perPage: {
            type: 'number',
            value: 10,
            serialize: false
        },
        'filter[objects]': {
            serialize: function (val) {
                var filters = this.attr('filters');
                if (filters && filters.length) {
                    return JSON.stringify(filters.serialize());
                } else {
                    return undefined;
                }
            }
        },
        'page[number]': {
            serialize: function () {
                if (this.attr('page')) {
                    return this.attr('page') + 1;
                }
                return undefined;
            }
        },
        'page[size]': {
            serialize: function () {
                return this.attr('perPage');
            }
        }
    }
});
var $__default = ParameterMap;
Object.defineProperties(module.exports, {
    FilterSerializers: {
        get: function () {
            return FilterSerializers;
        }
    },
    FilterMap: {
        get: function () {
            return FilterMap;
        }
    },
    FilterList: {
        get: function () {
            return FilterList;
        }
    },
    SortMap: {
        get: function () {
            return SortMap;
        }
    },
    ParameterMap: {
        get: function () {
            return ParameterMap;
        }
    },
    default: {
        get: function () {
            return $__default;
        }
    },
    __esModule: { value: true }
});