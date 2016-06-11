# Ember-cli-lunr

Simple full-text search for ember-cli apps using [lunr.js](http://lunrjs.com/).

## Description

This is a ember-cli wrapper for [lunr.js]( https://github.com/olivernn/lunr.js ), a small full-text search library for use in the browser. It indexes JSON documents and provides a simple search interface for retrieving documents that best match text queries.

## Installation

Installing the library is as easy as:

```bash
ember install ember-cli-lunr
```

## Configuring

Firstly, you need to create an index for the model you need to search. For more details on the index options refer lunr.js [docs](http://lunrjs.com/docs/#lunr).

```js
// app/instance-initializers/index-item.js

// For details about the index data checkout lunr.js
// documentation
var itemTitleIndexData = function() {
  this.ref('id');
  this.field('title');
  this.pipeline.remove(lunr.stopWordFilter);
  this.pipeline.remove(lunr.stemmer);
};

export default {
  name: 'indexItem',

  initialize: function(application) {
    var lunr = application.lookup('service:lunr');

    lunr.createIndex('item', itemTitleIndexData);
  }
};
```

Next, add an indexable mixin to your model and define the indexable keys.

```js
// app/pods/item/model.js
import DS from 'ember-data';
import LunrIndexableMixin from 'ember-cli-lunr/mixins/lunr-indexable';

var Item = DS.Model.extend(LunrIndexableMixin, {
  ...
  title: DS.attr('string'),
  ...
  indexableKeys: ['title']
});
```

After this, all records creates, updates, deletes on the model are kept track by the lunr index.

Now, you can search anywhere in your app using the lunr service's `search` method. This method is just a wrapper around lunr.js [search]( http://lunrjs.com/docs/#search ) method.

```js
// app/pods/items/controller.js
import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  lunr: Ember.inject.service(),
  searchQuery: null,

  result: computed('searchQuery', function() {
    var lunr = this.get('lunr'),
        query = this.get('searchQuery'),
        item = this.get('model'),
        resultIds = lunr.search('item', query).mapBy('ref');

    return items.filter(function(item) {
      return resultIds.contains(item.get('id'));
    });
  });
});
```
