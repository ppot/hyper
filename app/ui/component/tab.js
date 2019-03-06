const uuid = require('uuid');

class Tab {
    constructor(rpc) {
      this.id = uuid.v4();
      this.sessions = new Map();
      this.rpc = rpc;
      rpc.emit('tab:created', {uid: this.id});
    }
    
    execCommand() {
      
    }
};

module.exports = Tab;