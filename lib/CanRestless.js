/* jshint esnext:true */
import DefineList from 'can-define/list/list';
import DefineMap from 'can-define/map/map';
import connect from 'can-connect';
import batch from 'can-event/batch/batch';
import $ from 'jquery';

import set from 'can-set';
import {ParameterMap} from './Params';
import baseMap from 'can-connect/can/base-map/base-map';
/**
 * @typedef {MetadataObject} can-restless.types.MetadataObject MetadataObject
 * @parent can-restless.types
 * @option {Number} totalItems The total number of items available through this api
 * @option {can.Map} relationships Keys that represent field names where relationships exist. Each key's value in this object is set to `true` to keep track of which fields are relationships.
 */
const PropertiesObject = DefineMap.extend('Properties', {
    total: {
        type: 'number',
        value: 0
    },
    relationships: {Type: DefineMap, Value: DefineMap}
});

/**
 * @typedef {FlaskConnectOptions} can-restless.types.FlaskConnectOptions FlaskConnectOptions
 * @parent can-restless.types
 * @option {can.Map} map The template object to use when creating new objects. This
 * map can supply default values, getters and setters, and types of properties on an object
 * @option {String} idProp The proerty to use for the id
 * @option {String} name The name of the connection to use. This should be unique across the application, and should reference the data type that flask-restless is serving. Flask Restless defaults to using the tablename or the Class name as the data type name.
 * @option {String} url The url to the Flask-Restless resource
 */

/**
 *
 * A factory function that creates a new Flask-Restless API connection.
 * @parent can-restless
 * @signature `ConnectionFactory(options)`
 * @param {can-restless.types.FlaskConnectOptions} options The factory options
 * @return {can-connect/can/super-map}
 * A special super map that contains an additional property `metadata`
 * of type [{MetadataObject}](can-restless.types.MetadataObject).
 * @link can-restless.types.MetadataObject MetadataObject
 */
export function ConnectionFactory (options) {

    //a new list which should hold the objects
    const ObjectList = DefineList.extend('FlaskRestlessList', {
        '#': options.map
    });
    const properties = new PropertiesObject();
    const idProp = options.idProp || 'id';

    //create a flask-restless set algebra
    const algebra = new set.Algebra({
        sort () {
            return true;
        },
        perPage () {
            return true;
        },
        pageSize () {
            return true;
        }
    }

        // //unique id
        // set.props.id(idProp),
        //
        // // //pagination
        // set.props.offsetLimit('page[number]', 'page[size]'),
        //
        // //sorting
        // set.props.sort('sort')
    );

    //create and return a new connection
    const connection = baseMap({
        idProp: idProp,
        algebra: algebra,
        baseURL: options.url,
        metadata: properties,
        Map: options.map,
        List: options.map.List || ObjectList,
        name: options.name,
        url: {
            resource: options.url,
            getListData (params) {
                return new Promise((resolve, reject) => {
                    console.log(options.name, params);
                    params = new ParameterMap(params).serialize();
                    console.log(options.name, params);
                    var def = $.ajax({
                        url: this.resource,
                        dataType: 'json',
                        method: 'GET',
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        data: params
                    });
                    def.then((props) => {

                        //cache the metadata for future use
                        properties.total = props.meta.total;
                        resolve(props);
                    }, reject);
                });
            },
            getData (params) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: this.resource + '/' + params[idProp],
                        dataType: 'json',
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        method: 'GET'
                    }).then(resolve, reject);
                });
            },
            createData (attrs, id) {
                return new Promise((resolve, reject) => {
                    var data = {};

                    //exclude relationship properties
                    for (var a in attrs) {
                        if (attrs.hasOwnProperty(a) && !properties.relationships[a]) {
                            data[a] = attrs[a];
                        }
                    }

                    //post attributes to the create url
                    $.ajax({
                        url: this.resource,
                        dataType: 'json',
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
                    }).then(resolve, reject);

                });
            },
            updateData (attrs) {
                return new Promise((resolve, reject) => {
                    var data = {};

                    //exclude relationship properties
                    for (var a in attrs) {
                        if (attrs.hasOwnProperty(a) && !properties.relationships[a] && a !== idProp) {
                            data[a] = attrs[a];
                        }
                    }
                    $.ajax({
                        url: this.resource + '/' + attrs[idProp],
                        dataType: 'json',
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
                    }).then(resolve, reject);

                });
            },
            destroyData (attrs) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: this.resource + '/' + attrs[idProp],
                        dataType: 'json',
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        }
                    }).then(resolve, reject);
                });
            }
        },
        parseListProp: 'data',
        parseInstanceData (props) {

            //if for some reason we don't have an object, return
            if (!props) {
                return {};
            }

            //sometimes props are actually in the data property
            //could be a bug?
            if (props.data) {
                props = props.data;
            }

            //build a new object that consists of a combination of the FlaskRestless
            //response object
            var obj = props.attributes;
            obj.id = props[this.idProp];

            //include the relationship id's
            for (var rel in props.relationships) {
                if (props.relationships.hasOwnProperty(rel) &&
                    props.relationships[rel].hasOwnProperty('data')) {

                    //if its an array, extract an array of the ids
                    obj[rel] = Array.isArray(props.relationships[rel].data) ?
                        props.relationships[rel].data.map((item) => {
                            return item.id;
                        }) :
                        //otherwise return the id of the item or null if the proprty is not set
                        props.relationships[rel].data ? props.relationships[rel].data.id : null;
                    properties.relationships[rel] = true;
                }
            }
            return obj;
        }
    });
    return connection;
}
