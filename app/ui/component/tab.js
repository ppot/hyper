const uuid = require('uuid');

class Tab {
    constructor(rpc) {
      this.uid = uuid.v4();
      this.sessions = new Map();
      this.rpc = rpc;
      rpc.emit('tab:created', {uid: this.uid});

      this.setActive = () => {
         rpc.emit('tab:active', {uid: this.uid})
      }
    }
};

module.exports = Tab;