'use strict';

Editor.registerPanel( 'undo-debugger.panel', {
  // expose your properties
  properties: {
    data: {
      type: Object,
      value: null,
    }
  },

  ready () {
  },

  'undo-debugger:update-undos' ( data ) {
    this.set( 'data', data );
  },
});
