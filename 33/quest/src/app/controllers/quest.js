import Ember from 'ember';
import _ from "npm:lodash";

var codes = [
  {level: 0, code: 'TEST'}
];

export default Ember.ObjectController.extend({
  code: '',

  _init: function() {
    console.log('quest controller');

  }.on('init'),

  actions: {
    submitCode: function() {
      var enteredCode = this.get('code').toUpperCase();

      if (_.find(codes, {code: enteredCode})) {
        console.log('code found, transition to level next');
      } else {
        $('#btn-next')
          .removeClass('btn-success')
          .addClass('btn-danger')
          .addClass('animated shake')
          .text('Nope');
      }

    },
    onInputChange: function() {
      $('#btn-next')
        .removeClass('btn-danger')
        .addClass('btn-success')
        .removeClass('animated shake')
        .text('Next');
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
