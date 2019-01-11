import Lunr from 'lunr';
import lookup from '../utils/lookup';

var postIndexData = function() {
  this.ref('id');
  this.field('title');
  this.field('body');
  this.pipeline.remove(Lunr.stopWordFilter);
  this.pipeline.remove(Lunr.stemmer);
};

export default {
  name: 'indexPost',

  initialize: function(application) {
    var lunr = lookup(application, 'service:lunr');

    lunr.createIndex('post', postIndexData);
  }
};
