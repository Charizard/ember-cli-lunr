import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | model indexing', {
  beforeEach() {
    this.container = this.application.__container__;
  }
});

test('index when a model is created', function(assert) {
  assert.expect(1);

  let store = this.container.lookup('service:store');
  let lunrService = this.container.lookup('service:lunr');

  lunrService.on('didIndexRecord', function() {
    assert.ok(true, "creating a post indexes it");
  });

  // This is to make sure the instance-initializer is run.
  visit('/');
  andThen(function() {
    let post = store.createRecord('post', {
      title: "Sample title",
      body: "sample body"
    });

    post.save();
  });
});

// Test for when a model is updated and deleted
