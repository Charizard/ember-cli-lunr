import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('post', 'Post Model', {
  // Specify the other units that are required for this test.
  beforeEach: function(assert) {
    this.subject({
      lunr: {
        add: function() {
          assert.ok(true, "'add' Method called on lunr service");
        },
        update: function() {
          assert.ok(true, "'update' Method called on lunr service");
        },
        remove: function() {
          assert.ok(true, "'remove' Method called on lunr service");
        }
      }
    });
  }
});

test('Post is indexable', function (assert) {
  var post = this.subject({title: 'A title for a post', body: 'A body for post.'});

  assert.ok(post.indexableKeys.includes('id'), 'indexableKeys contains "id"');
  assert.ok(post.indexableKeys.includes('title'), 'indexableKeys contains "title"');
});

test('Post is indexed on didCreate', function (assert) {
  var post = this.subject({title: 'A title for a post', body: 'A body for post.'});

  Ember.run(function() {
    assert.expect(1);

    post.trigger('didCreate');
  });
});

test('Post is indexed on didLoad', function (assert) {
  var post = this.subject({title: 'A title for a post', body: 'A body for post.'});

  Ember.run(function() {
    assert.expect(1);

    post.trigger('didLoad');
  });
});

test('Post is re-indexed on didUpdate', function (assert) {
  var post = this.subject({title: 'A title for a post', body: 'A body for post.'});

  Ember.run(function() {
    assert.expect(1);

    post.trigger('didUpdate');
  });
});

test('Post is re-indexed on didReload', function (assert) {
  var post = this.subject({title: 'A title for a post', body: 'A body for post.'});

  Ember.run(function() {
    assert.expect(1);

    post.trigger('didReload');
  });
});

test('Post is un-indexed on willDestroy', function (assert) {
  var post = this.subject({title: 'A title for a post', body: 'A body for post.'});

  Ember.run(function() {
    assert.expect(1);

    post.trigger('willDestroy');
  });
});
