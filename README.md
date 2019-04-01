# ember-cli-lunr
[![npm version](https://badge.fury.io/js/ember-cli-lunr.svg)](https://badge.fury.io/js/ember-cli-lunr) [![Code Climate](https://codeclimate.com/github/Charizard/ember-cli-lunr/badges/gpa.svg)](https://codeclimate.com/github/Charizard/ember-cli-lunr) [![Build Status](https://travis-ci.org/Charizard/ember-cli-lunr.svg)](https://travis-ci.org/Charizard/ember-cli-lunr)

Simple full-text search for ember-cli apps using [lunr.js](http://lunrjs.com/).

## Description

This is a ember-cli wrapper for [lunr.js]( https://github.com/olivernn/lunr.js ), a small full-text search library for use in the browser. It indexes JSON documents and provides a simple search interface for retrieving documents that best match text queries.

## Installation

Installing the library is as easy as:

```bash
ember install ember-cli-lunr
```

## Configuring

Lunr 2.0 uses immutable index, so, you'll have to have an array of items to be searched beforehand. For usage with Lunr 1.0, see [0.0.5](https://github.com/Charizard/ember-cli-lunr/tree/v0.0.5) of this add-on.

Given a model named post,

```js
// app/pods/post/model.js
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
});
```
First, you'll have to create an index with the documents (keep in mind indexes are immutable) using the Lunr class,

```js
import Lunr from 'ember-cli-lunr/lunr';
...
// Pass in models to create method, this indexes all properties on the model.
let posts = Lunr.create({ models: get(this, 'posts') });

// Or you could specify just the properties that you want to index via the properties key.
let posts = Lunr.create({ models: get(this, 'posts'), properties: ['title'] });
```

Now, you can search anywhere in your app using the `search` method. This method is just a wrapper around lunr.js [search](https://lunrjs.com/docs/lunr.Index.html) method. For more advanced searching, checkout the lunr.js [guides](https://lunrjs.com/guides/searching.html#scoring).

```js
posts.search('lorem ipsum');
```

Putting this all together in a controller,

```js
// app/pods/posts/controller.js
import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import Lunr from 'ember-cli-lunr/lunr';

export default Controller.extend({
  // assuming posts array was set on controller from
  // setupController in route.
  posts: null,
  searchQuery: null,

  init() {
    this._super(...arguments);
    let postsIndex = Lunr.create({ models: get(this, 'posts') });
    set(this, 'postsIndex', postsIndex);
  },

  result: computed('searchQuery', function() {
    var query = this.get('searchQuery'),
        resultIds = get(this, 'postsIndex').search(query).mapBy('ref');

    return items.filter(function(item) {
      return resultIds.contains(item.get('id'));
    });
  });
});
```

## Support

Please leave a :star: to show some support. Thanks!
