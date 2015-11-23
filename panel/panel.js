'use strict';

Editor.registerPanel( 'undo-debugger.panel', {
  // expose your properties
  properties: {
    data: {
      type: Object,
      value: null,
    }
  },

  'panel-ready' () {
    Editor.sendRequestToCore('undo-debugger:query', data => {
      this.set( 'data', data );
    });
  },

  'undo-debugger:add-group' ( info ) {
    this.push( 'data.groups', info.group );
    this.set( 'data.position', info.position );
    this.set( 'data.savePosition', info.savePosition );
  },

  'undo-debugger:position-changed' ( info ) {
    this.set( 'data.position', info.position );
  },

  'undo-debugger:save-position-changed' ( info ) {
    this.set( 'data.savePosition', info.savePosition );
  },

  'undo-debugger:clear-redo' ( info ) {
    this.splice( 'data.groups', info.position+1 );
    this.set( 'data.position', info.position+1 );
    this.set( 'data.savePosition', info.savePosition );
  },

  'undo-debugger:clear' () {
    this.set( 'data.groups', [] );
    this.set( 'data.position', -1 );
    this.set( 'data.savePosition', -1 );
  },

  _indexEqual ( index, position ) {
    return index === position;
  },

});
