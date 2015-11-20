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
      groups: undo._groups.map((group, index) => {
        return {
          desc: group.desc,
          selected: undo._position === index,
          saved: undo._savePosition === index,
          commands: group._commands.map(cmd => {
            return {
              name: cmd.constructor.name,
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
