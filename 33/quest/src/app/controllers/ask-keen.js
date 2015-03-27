import Ember from 'ember';

export default Ember.ObjectController.extend({
  code:'',

  actions: {
    submitQuestion: function() {
      //todo retuta: show email box
      this.set('isQuestionSubmitted', true);
      this.socket.emit('new-question-posted', {userId: 1234, question: this.get('questionAsked')});
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
