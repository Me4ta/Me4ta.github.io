import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Route.extend({
  levelId: null,

  model: function(params) {
    this.levelId = parseInt(params.level_id);


    if (!this.levelId || !_.isNumber(this.levelId)) {
        throw 'Invalid level: ' + this.levelId;
    }

    if (this.levelId <=0 || this.levelId > 33) {
      throw 'Invalid level number: ' + this.levelId;
    }

    return {};
  },

  renderTemplate: function() {
    this.render('quest/levels/' + this.levelId);
  }
});
