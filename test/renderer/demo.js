'use strict';

function _makeData () {
  return {
    position: 0,
    savePosition: 0,
    groups: [
      {
        desc: 'group-01',
        commands: [
          {
            name: 'command-01',
            dirty: true,
            info: { a: 'a' },
          },
        ],
      },

      {
        desc: 'group-02',
        commands: [
          {
            name: 'command-01',
            dirty: true,
            info: { a: 'a' },
          },
          {
            name: 'command-02',
            dirty: true,
            info: { a: 'a', b: 'b' },
          },
        ],
      },

      {
        desc: 'group-03',
        commands: [
          {
            name: 'command-01',
            dirty: true,
            info: { a: 'a' },
          },
          {
            name: 'command-02',
            dirty: true,
            info: { a: 'a', b: 'b' },
          },
          {
            name: 'command-03',
            dirty: true,
            info: { a: 'a', b: 'b', c: 'c' },
          },
        ],
      },
    ]
  };
}

let position = 0;

setInterval(() => {
  let data = _makeData();

  position += 1;
  position %= 3;

  data.position = position;
  data.groups[data.position].selected = true;
  data.groups[data.savePosition].saved = true;

  Helper.recv('undo-debugger:update-undos', data );
}, 1000 );

describe('demo', function () {
  this.timeout(0);
  Helper.runPanel( 'undo-debugger.panel' );

  it('is a demo', function (done) {
    let data = _makeData();
    Helper.recv('undo-debugger:update-undos', data );
  });
});
