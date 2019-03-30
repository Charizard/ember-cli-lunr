import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';
import Lunr from 'ember-cli-lunr/lunr';

module('Acceptance | model indexing', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('index an array', async function(assert) {
    let store = this.owner.lookup('service:store');

    assert.expect(2);

    let posts = await store.findAll('post');
    let lunr = Lunr.create({ models: posts });

    assert.ok(!isEmpty(get(lunr, 'index')), "must create and store the index");
    assert.deepEqual(get(lunr, 'index').fields, ["title", "body"], "must create and store the index with correct fields");
  });

  test('index an array passed along with properties', async function(assert) {
    let store = this.owner.lookup('service:store');
    let fields = ["title"];

    assert.expect(2);

    let posts = await store.findAll('post');
    let lunr = Lunr.create({ models: posts, properties: fields });

    assert.ok(!isEmpty(get(lunr, 'index')), "must create and store the index");
    assert.deepEqual(get(lunr, 'index').fields, fields, "must create and store the index with correct fields");
  });

  test('can search an index', async function(assert) {
    let store = this.owner.lookup('service:store');
    let newPost = server.create('post', { title: 'sample title' });

    assert.expect(2);

    let allPosts = await store.findAll('post');
    let lunr = Lunr.create({ models: allPosts });

    let res = lunr.search('title');

    assert.ok(!isEmpty(res), "must return a post");
    assert.ok(res.mapBy('ref').includes(get(newPost, 'id')), "must include the created post");
  });
});
