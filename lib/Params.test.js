import q from 'steal-qunit';
import { FilterSerializers, FilterMap, ParameterMap } from './Params';

let params;

q.module('lib/Params.ParameterMap', {
  beforeEach() {
    params = new ParameterMap();
  },
  afterEach() {
    params = null;
  }
});

q.test('parameter serialization', assert => {
  let props = params.serialize();

  //values that shouldn't be serialized
  assert.notOk(props.filters, 'filters should not be serialized');
  assert.notOk(props.page, 'page should not be serialized');
  assert.notOk(props.perPage, 'perPage should not be serialized');

  //values that should always be serialized
  assert.ok(props['page[size]'], 'page[size] should be serialized');
});


q.test('parameter filter serialization', assert => {
  let props = params.serialize();
  assert.notOk(props['filter[objects]'], 'filter[objects] should not be serialized by default');

  params.attr('filters').push({
    name: 'testField',
    operator: 'equals',
    value: 'testVal'
  });

  props = params.serialize();
  assert.ok(props['filter[objects]'], 'filter[objects] should be serialized when they are added');
});


q.test('page serialization', assert => {
  let props = params.serialize();
  assert.notOk(props['page[number]'], 'page[number] should not be serialized by default');

  params.attr('page', 4);
  props = params.serialize();
  assert.ok(props['page[number]'], 'page[number] should be serialized when value is greater than 0');
  assert.equal(props['page[number]'], 5, 'page[number] should be incremented page by one');

});

q.test('sort ascending', assert => {
  let field = 'testField';
  params.attr('sort', {
    fieldName: 'testField',
    type: 'asc'
  });
  let props = params.serialize();
  assert.equal(props.sort, field, 'sort should serialize to fieldname');
});

q.test('sort descending', assert => {
  let field = 'testField';
  params.attr('sort', {
    fieldName: 'testField',
    type: 'desc'
  });
  let props = params.serialize();
  assert.equal(props.sort, '-' + field, 'sort should serialize to -fieldname');
});

let filter;
q.module('lib/Params.FilterMap', {
  beforeEach() {
    filter = new FilterMap();
  },
  afterEach() {
    params = null;
  }
});

q.test('parameter serialization', assert => {
  filter.attr({
    name: 'testField',
    operator: 'equals',
    value: 'testvalue'
  });

  let props = filter.serialize();
  assert.ok(props.name, 'name should be serialized by default');
  assert.notOk(props.operator, 'operator should not be serialized by default');
  assert.notOk(props.value, 'value should not be serialized by default');
  assert.ok(props.op, 'op should be serialized by default');
  assert.ok(props.val, 'val should be serialized by default');
});

q.test('like operator', assert => {
  filter.attr({
    name: 'testField',
    operator: 'like',
    value: 'testvalue'
  });
  let props = filter.serialize();
  assert.equal(props.val, '%testvalue%', 'like operator should concat % charaters to each side');
});

q.test('starts_with operator', assert => {
  filter.attr({
    name: 'testField',
    operator: 'starts_with',
    value: 'testvalue'
  });
  let props = filter.serialize();
  assert.equal(props.val, 'testvalue%', 'starts_with operator should concat % charaters to end of val');
  assert.equal(props.op, 'like', 'op should be come like');
});

q.test('ends_with operator', assert => {
  filter.attr({
    name: 'testField',
    operator: 'ends_with',
    value: 'testvalue'
  });
  let props = filter.serialize();
  assert.equal(props.val, '%testvalue', 'ends_with operator should concat % charaters to start of val');
  assert.equal(props.op, 'like', 'op should be come like');
});

q.test('greater_than operator', assert => {
  filter.attr({
    name: 'testField',
    operator: 'greater_than',
    value: '6'
  });
  let props = filter.serialize();
  assert.equal(typeof props.val, 'number', '%testvalue', 'greater_than operator should convert to number');
  assert.equal(props.op, '>', 'op should be come >');
});

q.test('less_than operator', assert => {
  filter.attr({
    name: 'testField',
    operator: 'less_than',
    value: '6'
  });
  let props = filter.serialize();
  assert.equal(typeof props.val, 'number', 'less_than operator should convert to number');
  assert.equal(props.op, '<', 'op should be come <');
});

q.test('before operator', assert => {
  filter.attr({
    name: 'testField',
    operator: 'before',
    value: '10/10/2015'
  });
  let props = filter.serialize();
  assert.equal(props.op, '<', 'op should be come <');
});

q.test('after operator', assert => {
  filter.attr({
    name: 'testField',
    operator: 'after',
    value: '10/10/2015'
  });
  let props = filter.serialize();
  assert.equal(props.op, '>', 'op should be come >');
});
