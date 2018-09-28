import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | model indexing', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.container = this.application.__container__;
  });

  test('index when a model is created', async function(assert) {
    assert.expect(1);

    let store = this.owner.lookup('service:store');
    let lunrService = this.owner.lookup('service:lunr');

    lunrService.on('didIndexRecord', function() {
      assert.ok(true, "creating a post indexes it");
    });

    // This is to make sure the instance-initializer is run.
    await visit('/');
    let post = store.createRecord('post', {
      title: "Sample title",
      body: "sample body"
    });

    post.save();
  });

  // Test for when a model is updated and deleted
});
