import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

module('Post Model', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function(assert) {
    // mock the service to make assertions

    run(() => {
      this.owner.unregister('service:lunr');
      this.owner.register(
        'service:lunr',
        Service.extend({
          add: function() {
            assert.ok(true, "'add' Method called on lunr service");
          },
          update: function() {
            assert.ok(true, "'update' Method called on lunr service");
          },
          remove: function() {
            assert.ok(true, "'remove' Method called on lunr service");
          }
        })
      );
    });
  });

  test('Post is indexable', async function (assert) {
    let post = await this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'});
    assert.ok(post.get('indexableKeys').indexOf('id') > -1, 'indexableKeys contains "id"');
    assert.ok(post.get('indexableKeys').indexOf('title') > -1, 'indexableKeys contains "title"');
  });

  test('Post is indexed on didCreate', async function (assert) {
    let post = await this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'});
    assert.expect(1);
    post.trigger('didCreate');
  });

  test('Post is indexed on didLoad', async function (assert) {
    let post = await this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'});
    assert.expect(1);
    post.trigger('didLoad');
  });

  test('Post is re-indexed on didUpdate', async function (assert) {
    let post = await this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'});
    assert.expect(1);
    post.trigger('didUpdate');
  });

  test('Post is re-indexed on didReload', async function (assert) {
    let post = await this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'});
    assert.expect(1);
    post.trigger('didReload');
  });

  test('Post is un-indexed on willDestroy', async function (assert) {
    let post = await this.owner.lookup('service:store').createRecord('post', {title: 'A title for a post', body: 'A body for post.'});
    assert.expect(1);
    post.trigger('willDestroy');
  });
});
