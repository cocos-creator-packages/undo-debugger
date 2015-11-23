'use strict';

function _dumpGroup ( group ) {
  return {
    desc: group.desc,
    commands: group._commands.map(cmd => {
      return {
        name: cmd.constructor.name,
        dirty: cmd.dirty(),
        info: cmd.info,
      };
    }),
  };
}

module.exports = {
  load () {
  },

  unload () {
  },

  'undo-debugger:open' () {
    Editor.Panel.open('undo-debugger.panel');
  },

  'undo-debugger:query' ( reply ) {
    let undo = Editor.Undo._global;
    let result = {
      position: undo._position,
      savePosition: undo._savePosition,
      groups: undo._groups.map(group => {
        return _dumpGroup(group);
      }),
    };

    reply( result );
  },

  'undo:changed' ( type ) {
    let undo = Editor.Undo._global;

    if ( type === 'commit' ) {
      Editor.sendToPanel(
        'undo-debugger.panel',
        'undo-debugger:add-group', {
          position: undo._position,
          savePosition: undo._savePosition,
          group: _dumpGroup(undo._groups[undo._position])
        }
      );
    } else if ( type === 'undo' || type === 'redo' ) {
      Editor.sendToPanel(
        'undo-debugger.panel',
        'undo-debugger:position-changed', {
          position: undo._position,
        }
      );
    } else if ( type === 'save' ) {
      Editor.sendToPanel(
        'undo-debugger.panel',
        'undo-debugger:save-position-changed', {
          savePosition: undo._savePosition,
        }
      );
    } else if ( type === 'clear-redo' ) {
      Editor.sendToPanel(
        'undo-debugger.panel',
        'undo-debugger:clear-redo', {
          position: undo._position,
          savePosition: undo._savePosition,
        }
      );
    }
  },

};
