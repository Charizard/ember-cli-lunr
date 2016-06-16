/* global lunr */

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
    var lunr = application.lookup('service:lunr');

    lunr.createIndex('post', postIndexData);
  }
};
