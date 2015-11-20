'use strict';

describe('demo', function () {
  this.timeout(0);
  Helper.runPanel( 'undo-debugger.panel' );

  it('is a demo', function (done) {
    Helper.recv('undo-debugger:update-undos', {
      position: 1,
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
    });
  });
});
