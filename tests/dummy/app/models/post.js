import DS from 'ember-data';
import LunrIndexable from 'ember-cli-lunr/mixins/lunr-indexable';

export default DS.Model.extend(LunrIndexable, {
  title: DS.attr('string'),
  body: DS.attr('string'),

  init() {
    this._super(...arguments);
    // already initialized via  mixin
    this.indexableKeys.push('title');
  }

});
