/* jshint esnext:true */
import DefineList from 'can-define/list/list';
import DefineMap from 'can-define/map/map';
import $ from 'jquery';

import {ParameterMap} from './Params';
import algebra from './algebra';
import baseMap from 'can-connect/can/base-map/base-map';
/**
 * @typedef {MetadataObject} can-restless.types.MetadataObject MetadataObject
 * @parent can-restless.types
 * @option {Number} totalItems The total number of items available through this api
 * @option {can.Map} relationships Keys that represent field names where relationships exist. Each key's value in this object is set to `true` to keep track of which fields are relationships.
 */
const MetaMap = DefineMap.extend('Properties', {seal: false}, {
    total: {
        type: 'number',
        value: 0
    },
    relationships: {Value: DefineMap}
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
 * @signature `connectionFactory(options)`
 * @param {can-restless.types.FlaskConnectOptions} options The factory options
 * @return {can-connect/can/super-map}
 * A special super map that contains an additional property `metadata`
 * of type [{MetadataObject}](can-restless.types.MetadataObject).
 * @link can-restless.types.MetadataObject MetadataObject
 */
export function connectionFactory (options) {

    //a new list which should hold the objects
    const ObjectList = DefineList.extend('FlaskRestlessList', {
        '#': options.map
    });
    const idProp = options.idProp || 'id';

    const meta = new MetaMap();

    //create and return a new connection
    const connection = baseMap({
        idProp: idProp,
        algebra: algebra,
        baseURL: options.url,
        metadata: meta,
        Map: options.map,
        List: options.map.List || ObjectList,
        name: options.name,
        url: {
            resource: options.url,
            getListData (params) {
                return new Promise((resolve, reject) => {

                    // convert parameters to flask-restless params
                    params = new ParameterMap(params).serialize();

                    const def = $.ajax({
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

                        // update the metadata
                        connection.metadata.set(props.meta);

                        resolve(props);
                    }, reject);
                });
            },
            getData (params) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `${this.resource}/${params[idProp]}`,
                        dataType: 'json',
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        method: 'GET'
                    }).then(resolve, reject);
                });
            },
            createData (attrs) {
                return new Promise((resolve, reject) => {
                    const data = {};

                    //exclude relationship properties
                    for (var a in attrs) {
                        if (attrs.hasOwnProperty(a) && !connection.metadata.relationships[a]) {
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
                                type: connection.name
                            }
                        }),
                        method: 'POST'
                    }).then(resolve, reject);

                });
            },
            updateData (attrs) {
                return new Promise((resolve, reject) => {
                    const data = {};

                    //exclude relationship properties
                    for (var a in attrs) {
                        if (attrs.hasOwnProperty(a) && !connection.metadata.relationships[a] && a !== idProp) {
                            data[a] = attrs[a];
                        }
                    }
                    $.ajax({
                        url: `${this.resource}/${attrs[idProp]}`,
                        dataType: 'json',
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        data: JSON.stringify({
                            data: {
                                attributes: data,
                                type: connection.name,
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
                        url: `${this.resource}/${attrs[idProp]}`,
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
            const obj = props.attributes;

            // flask restless doesn't include the id prop in the attributes so we set it
            if (!obj[idProp]) {
                obj[idProp] = props.id;
            }

            // include the relationship id's
            for (var rel in props.relationships) {
                if (props.relationships.hasOwnProperty(rel) &&
                    props.relationships[rel].hasOwnProperty('data')) {

                    //if its an array, extract an array of the ids
                    obj[rel] = Array.isArray(props.relationships[rel].data) ? props.relationships[rel].data.map((item) => {
                        return item.id;
                    }) : props.relationships[rel].data ? props.relationships[rel].data.id : null;

                    // update the metadata relationships
                    connection.metadata.relationships.set(rel, true);
                }
            }

            return obj;
        }
    });

    return connection;
}
