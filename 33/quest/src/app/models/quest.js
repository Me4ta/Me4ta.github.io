import DS from 'ember-data';

export default DS.Model.extend({

  currentLevel: DS.attr('number', {defaultValue: 0})

});
