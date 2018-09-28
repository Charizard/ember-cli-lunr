/* global lunr */

import Evented from '@ember/object/evented';

import Service from '@ember/service';

export default Service.extend(Evented, {
  init() {
    this._super(...arguments);
    this.indexes = {};
  },

  createIndex: function(type, structure) {
    this.indexes[type] = lunr(structure);
  },

  add: function(type, dataHash) {
    this.indexes[type].add(dataHash);
    this.trigger('didIndexRecord', type, dataHash.id);
  },

  update: function(type, dataHash) {
    this.indexes[type].update(dataHash);
    this.trigger('didReindexRecord', type, dataHash.id);
  },

  remove: function(type, id) {
    this.indexes[type].remove(id);
    this.trigger('didUnindexRecord', type, id);
  },

  search: function(type, string) {
    return this.indexes[type].search(string);
  }
});
