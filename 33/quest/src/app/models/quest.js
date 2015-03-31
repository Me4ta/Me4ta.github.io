import DS from 'ember-data';

export default DS.Model.extend({

  currentLevelNumber: DS.attr('number', {defaultValue: 0})

});
