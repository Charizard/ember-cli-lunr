import EmberObject, { get, set, getProperties } from '@ember/object';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';
import lunr from 'lunr';

export default EmberObject.extend({
  init() {
    let models = get(this, 'models');
    // Clone the passed in array to avoid modifying the original one.
    let properties = (get(this, 'properties') || []).slice(0);

    if (isEmpty(models)) {
      throw Error('models passed to Lunr.create is empty');
      // Show error;
    }

    set(this, 'index', lunr(function () {
      let model = get(models, 'firstObject');
      let documents;

      // Declare fields for lunr
      if (isEmpty(properties) && model) {
        properties = [];
        get(model, 'constructor.attributes').forEach((_, name) => {
          this.field(name);
          properties.push(name);
        });
        documents = models;
      } else {
        properties.forEach((name) => {
          this.field(name);
        });
        documents = models.map((model) => {
          return model.getProperties(properties);
        });
      }

      // Declare reference for lunr
      // TODO: Make id configurable
      this.ref('id');

      // id should always be indexed
      properties.push('id');

      // Add documents to the index
      documents.forEach((doc) => {
        const data = getProperties(doc, properties);
        this.add(data);
      });
    }));
  },

  search(query) {
    return A(get(this, 'index').search(query));
  }
});
