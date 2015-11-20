'use strict';

module.exports = {
  load () {
  },

  unload () {
  },

  'undo-debugger:open' () {
    Editor.Panel.open('undo-debugger.panel');
  },

  'undo:changed' () {
    let undo = Editor.Undo._global;
    let result = {
      position: undo._position,
      savePosition: undo._savePosition,
      groups: undo._groups.map(group => {
        return {
          desc: group.desc,
          commands: group._commands.map(cmd => {
            return {
              name: cmd.constructor.toString(),
              dirty: cmd.dirty(),
              info: cmd.info,
            };
          }),
        };
      }),
    };

    Editor.sendToPanel(
      'undo-debugger.panel',
      'undo-debugger:update-undos',
      result
    );
  },

};
