import Ember from 'ember';
const { on } = Ember;

export default Ember.Mixin.create({
  lunr: Ember.inject.service(),
  concatenatedProperties: ['indexableKeys'],
  indexableKeys: ['id'],

  indexRecord: on('didCreate', 'didLoad', function() {
    var type = this.constructor.modelName,
        indexableKeys = this.get('indexableKeys'),
        data = this.getProperties.apply(this, indexableKeys);

    this.get('lunr').add(type, data);
  }),

  reindexRecord: on('didReload', 'didUpdate', function() {
    var type = this.constructor.modelName,
        indexableKeys = this.get('indexableKeys'),
        data = this.getProperties.apply(this, indexableKeys);

    this.get('lunr').update(type, data);
  }),

  unindexRecord: on('willDestroy', function() {
    var type = this.constructor.modelName,
        id = this.get('id');

    this.get('lunr').remove(type, id);
  })
});
