/*lib/CanRestless*/
define([
    'can/list',
    'can/map',
    'can-connect',
    'can/util/library',
    'can-set',
    './Params',
    'can-connect/constructor',
    'can-connect/can/map',
    'can-connect/constructor/store',
    'can-connect/data/callbacks',
    'can-connect/data/callbacks-cache',
    'can-connect/data/inline-cache',
    'can-connect/data/parse',
    'can-connect/data/url',
    'can-connect/data/localstorage-cache',
    'can-connect/real-time',
    'can-connect/fall-through-cache',
    'can-connect/constructor/callbacks-once'
], function ($__0, $__2, $__4, $__6, $__8, $__10, $__12, $__13, $__14, $__15, $__16, $__17, $__18, $__19, $__20, $__21, $__22, $__23) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    if (!$__2 || !$__2.__esModule)
        $__2 = { default: $__2 };
    if (!$__4 || !$__4.__esModule)
        $__4 = { default: $__4 };
    if (!$__6 || !$__6.__esModule)
        $__6 = { default: $__6 };
    if (!$__8 || !$__8.__esModule)
        $__8 = { default: $__8 };
    if (!$__10 || !$__10.__esModule)
        $__10 = { default: $__10 };
    if (!$__12 || !$__12.__esModule)
        $__12 = { default: $__12 };
    if (!$__13 || !$__13.__esModule)
        $__13 = { default: $__13 };
    if (!$__14 || !$__14.__esModule)
        $__14 = { default: $__14 };
    if (!$__15 || !$__15.__esModule)
        $__15 = { default: $__15 };
    if (!$__16 || !$__16.__esModule)
        $__16 = { default: $__16 };
    if (!$__17 || !$__17.__esModule)
        $__17 = { default: $__17 };
    if (!$__18 || !$__18.__esModule)
        $__18 = { default: $__18 };
    if (!$__19 || !$__19.__esModule)
        $__19 = { default: $__19 };
    if (!$__20 || !$__20.__esModule)
        $__20 = { default: $__20 };
    if (!$__21 || !$__21.__esModule)
        $__21 = { default: $__21 };
    if (!$__22 || !$__22.__esModule)
        $__22 = { default: $__22 };
    if (!$__23 || !$__23.__esModule)
        $__23 = { default: $__23 };
    var List = $__0.default;
    var CanMap = $__2.default;
    var connect = $__4.default;
    var can = $__6.default;
    var set = $__8.default;
    var ParameterMap = $__10.ParameterMap;
    $__12;
    $__13;
    $__14;
    $__15;
    $__16;
    $__17;
    $__18;
    $__19;
    $__20;
    $__21;
    $__22;
    $__23;
    var PropertiesObject = CanMap.extend({
        define: {
            total: {
                type: 'number',
                value: 0
            },
            relationships: { Value: CanMap }
        }
    });
    function ConnectionFactory(options) {
        var Objectist = List.extend({ Map: options.map });
        var properties = new PropertiesObject();
        var idProp = options.idProp || 'id';
        var algebra = new set.Algebra({
            'filter[objects]': function () {
                console.log(arguments);
                return true;
            }
        }, set.comparators.id(idProp), set.comparators.rangeInclusive('page[number]'), set.comparators.sort('sort'));
        var cacheConnection = connect(['data-localstorage-cache'], { name: options.name });
        return connect([
            'constructor',
            'can-map',
            'constructor-store',
            'data-callbacks',
            'data-callbacks-cache',
            'data-inline-cache',
            'data-parse',
            'data-url',
            'real-time',
            'fall-through-cache',
            'constructor-callbacks-once'
        ], {
            cacheConnection: cacheConnection,
            idProp: idProp,
            algebra: algebra,
            baseURL: options.url,
            metadata: properties,
            Map: options.map,
            List: options.map.List,
            name: options.name,
            url: {
                resource: options.url,
                getListData: function (params) {
                    params = new ParameterMap(params);
                    var def = can.ajax({
                        url: this.resource,
                        headers: { 'Accept': 'application/vnd.api+json' },
                        method: 'GET',
                        data: params.serialize()
                    });
                    def.then(function (props) {
                        properties.attr('total', props.meta.total);
                    });
                    return def;
                },
                getData: function (params) {
                    var def = can.ajax({
                        url: this.resource + '/' + params[idProp],
                        headers: { 'Accept': 'application/vnd.api+json' },
                        method: 'GET'
                    });
                    return def;
                },
                createData: function (attrs) {
                    var data = {};
                    for (var a in attrs) {
                        if (attrs.hasOwnProperty(a) && !properties.attr('relationships.' + a)) {
                            data[a] = attrs[a];
                        }
                    }
                    return can.ajax({
                        url: this.resource,
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        data: JSON.stringify({
                            data: {
                                attributes: data,
                                type: options.name
                            }
                        }),
                        method: 'POST'
                    });
                },
                updateData: function (attrs) {
                    var data = {};
                    for (var a in attrs) {
                        if (attrs.hasOwnProperty(a) && !properties.attr('relationships.' + a)) {
                            data[a] = attrs[a];
                        }
                    }
                    return can.ajax({
                        url: this.resource + '/' + attrs[idProp],
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        data: JSON.stringify({
                            data: {
                                attributes: data,
                                type: options.name,
                                id: attrs[idProp]
                            }
                        }),
                        method: 'PATCH'
                    });
                },
                destroyData: function (attrs) {
                    return can.ajax({
                        url: this.resource + '/' + attrs[idProp],
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        method: 'DELETE'
                    });
                }
            },
            parseListProp: 'data',
            parseInstanceData: function (props) {
                if (!props) {
                    return {};
                }
                if (props.data) {
                    props = props.data;
                }
                var obj = props.attributes;
                obj.id = props[this.idProp];
                can.batch.start();
                for (var rel in props.relationships) {
                    if (props.relationships.hasOwnProperty(rel) && props.relationships[rel].hasOwnProperty('data')) {
                        obj[rel] = Array.isArray(props.relationships[rel].data) ? props.relationships[rel].data.map(function (item) {
                            return item.id;
                        }) : props.relationships[rel].data ? props.relationships[rel].data.id : null;
                        properties.attr('relationships.' + rel, true);
                    }
                }
                can.batch.stop();
                return obj;
            }
        });
    }
    return {
        get ConnectionFactory() {
            return ConnectionFactory;
        },
        __esModule: true
    };
});