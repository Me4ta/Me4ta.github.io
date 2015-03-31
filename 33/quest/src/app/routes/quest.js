import Ember from 'ember';
import levels from '../utils/levelsList';
import _ from 'npm:lodash';

export default Ember.Route.extend({

  beforeModel: function(transition) {
    console.log(transition.targetName);
    if (transition.targetName  !== 'quest.level.index') {
      this.replaceWith('intro');
    }
  },

  model: function(params) {

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
  },

  setupController: function(controller, model) {
    controller.set('model', model);

    var currentLevelNumber = model.get('currentLevelNumber');

    var finishedLevels = _.filter(levels, function(level) {
      return level.number < currentLevelNumber;
    });

    controller.set('finishedLevels', finishedLevels);
  }
});
