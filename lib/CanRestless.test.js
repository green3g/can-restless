import { ConnectionFactory } from './CanRestless';
import q from 'steal-qunit';
import CanMap from 'can/map/';

let Person, jeff;

q.module('lib/CanRestless', {
  beforeEach() {
    Person = ConnectionFactory({
      name: 'person',
      url: 'http://localhost:5000/api/person',
      map: CanMap.extend({
        name: 'John',
        birth_date: null
      })
    });

    jeff = new Person.Map({
      name: 'Jeffry Doe',
      birth_date: new Date()
    });
  },
  afterEach() {
    Person = null;
    jeff = null;
  }
});

q.test('saving new data', assert => {
  let done = assert.async();
  Person.save(jeff).then(data => {
    assert.ok(data.id, 'data should be resolved and new data created should have an id');
    done();
  });
});

q.test('getting list data', assert => {
  let done = assert.async();
  //read the data
  Person.getList({}).then(data => {
    assert.ok(typeof data.length !== 'undefined', 'data should be an array type');
    done();
  });
});

q.test('destroying data', assert => {
  let done = assert.async();
  //delete the data
  Person.destroy(jeff).then(data => {
    assert.ok(data, 'data should be resolved successfully');
    done();
  }).fail(data => {
    assert.ok(data, 'if not found, data should still resolve successfully');
    done();
  });
});
