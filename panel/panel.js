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
    Editor.Ipc.sendToMain('undo-debugger:query', data => {
      this.set( 'data', data );
    });
  },

  'undo-debugger:add-group' ( event, info ) {
    this.push( 'data.groups', info.group );
    this.set( 'data.position', info.position );
    this.set( 'data.savePosition', info.savePosition );
  },

  'undo-debugger:position-changed' ( event, info ) {
    this.set( 'data.position', info.position );
  },

  'undo-debugger:save-position-changed' ( event, info ) {
    this.set( 'data.savePosition', info.savePosition );
  },

  'undo-debugger:clear-redo' ( event, info ) {
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
