import Ember from 'ember';

export default Ember.ObjectController.extend({
  code:'',

  _init: function() {
    console.log('quest controller');

    console.log('');
  }.on('init'),

  actions: {
    submitCode: function() {
      console.log(this.get('code'));
      console.log(this.get('model').id);
    },
    onInputChange: function() {
      //this.set('code', '1');
    }
  },

  sockets: {
    connect: function() {
      console.log('Sockets connected...');
    },

    disconnect: function() {
      console.log('Sockets disconnected...');
    }
  }

});
