import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { isEmpty } = Ember;

moduleFor('service:lunr', 'Lunr Service', {
  unit: true
});

test('it has indexes', function(assert) {
  let service = this.subject();
  assert.ok(service.indexes instanceof Object, "of type object");
});

test('createIndex method', function(assert) {
  let service = this.subject();

  service.createIndex('post');

  assert.notOk(isEmpty(service.indexes['post']), "creates and stores the index in indexes object");
});

test('add method', function(assert) {
  let service = this.subject();

  assert.expect(1);

  service.on('didIndexRecord', function() {
    assert.ok(true, "triggers didIndexRecord event");
  });

  service.createIndex('post');
  service.add('post', { id: 1, title: "Sample title"});
});

test('update method', function(assert) {
  let service = this.subject();

  assert.expect(1);

  service.on('didReindexRecord', function() {
    assert.ok(true, "triggers didReindexRecord event");
  });

  service.createIndex('post');
  service.update('post', { id: 1, title: "Sample title"});
});

test('remove method', function(assert) {
  let service = this.subject();

  assert.expect(1);

  service.on('didUnindexRecord', function() {
    assert.ok(true, "triggers didUnindexRecord event");
  });

  service.createIndex('post');
  service.remove('post', { id: 1, title: "Sample title"});
});
