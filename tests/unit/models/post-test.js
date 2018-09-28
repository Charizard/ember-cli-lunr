import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Post Model', function(hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  hooks.beforeEach(function(assert) {
    run(() => this.owner.lookup('service:store').createRecord('post', {
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
    }));
  });

  test('Post is indexable', function (assert) {
    var post = run(
      () => this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'})
    );

    assert.ok(post.get('indexableKeys').indexOf('id') > -1, 'indexableKeys contains "id"');
    assert.ok(post.get('indexableKeys').indexOf('title') > -1, 'indexableKeys contains "title"');
  });

  test('Post is indexed on didCreate', function (assert) {
    var post = run(
      () => this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'})
    );

    run(function() {
      assert.expect(1);

      post.trigger('didCreate');
    });
  });

  test('Post is indexed on didLoad', function (assert) {
    var post = run(
      () => this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'})
    );

    run(function() {
      assert.expect(1);

      post.trigger('didLoad');
    });
  });

  test('Post is re-indexed on didUpdate', function (assert) {
    var post = run(
      () => this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'})
    );

    run(function() {
      assert.expect(1);

      post.trigger('didUpdate');
    });
  });

  test('Post is re-indexed on didReload', function (assert) {
    var post = run(
      () => this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'})
    );

    run(function() {
      assert.expect(1);

      post.trigger('didReload');
    });
  });

  test('Post is un-indexed on willDestroy', function (assert) {
    var post = run(
      () => this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'})
    );

    run(function() {
      assert.expect(1);

      post.trigger('willDestroy');
    });
  });
});
