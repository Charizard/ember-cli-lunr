/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-lunr',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/lunr.js/lunr.js');
  }
};
