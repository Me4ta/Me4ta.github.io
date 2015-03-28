import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {

    var self = this;

    //if there is 1 quest - use it, if none - create first one, if more than one - throw error

    var quest = this.store.find('quest').then(function(records) {

      var recordsArray = records.toArray();

      if (!recordsArray || recordsArray.length === 0) {
        quest = self.store.createRecord('quest');
        return quest.save();
      } else if (recordsArray.length === 1) {
        return recordsArray[0];
      } else {
        throw 'There multiple quests found, clear local storage and start over.';
      }
    });

    return quest;
  }

});
