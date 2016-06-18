/* global lunr */
import lookup from '../utils/lookup';

var postIndexData = function() {
  this.ref('id');
  this.field('title');
  this.field('body');
  this.pipeline.remove(lunr.stopWordFilter);
  this.pipeline.remove(lunr.stemmer);
};

export default {
  name: 'indexPost',

  initialize: function(application) {
    var lunr = lookup(application, 'service:lunr');

    lunr.createIndex('post', postIndexData);
  }
};
