<!--
@page can-restless Home
@group can-restless.types Type Definitions
-->


## can-restless

A client data model for interacting with data from [`flask-restless`](https://github.com/jfinkels/flask-restless)

## Features

 * Full crud api for retrieving, updating, and deleting data
 * Retrieve lists of data with filtering, pagination, and sorting
 * Pure data model, quickly build your own user interface, or use [can-crud](https://github.com/roemhildtg/can-crud-app)

## Quick Start

```
npm install can-restless --save
```

```javascript
import Factory from 'can-restless';
import CanMap from 'can/map/';

let Task = CanMap.extend({
  name: 'My Task',
  description: 'More details about the task'
  is_complete: false,
});

let connection = Factory({
  map:Task,

  //this is the default id property
  //idProp: 'id',
  name: 'task',
  url: '/api/tasks'
});

//fetch the list with no parameters
let deferred = connection.getList({});

//fetch the list with sorting
deferred = connection.getList({
  sort: {
    type: 'asc',
    fieldName: 'description'
  }
});

//fetch the list with a filter
deferred = connection.getList({
  filters: [{
    name: 'description',
    operator: 'like',
    value: '%details%'
  }]
});

//fetch one item by id
deferred = connection.get({
  id: 1
});
```
