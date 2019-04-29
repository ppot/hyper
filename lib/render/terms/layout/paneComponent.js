import React from 'react';
import TermContainer from '../termContainer';

class PaneComponent extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    const {uid, style, render} = this.props; 
    return (
      <div key={`term-${uid}`} 
      className="pane" 
       style={style}
      >
       <TermContainer {...{uid, render}}/>
      <style jsx>{`
        .pane {
          flex: 1;
          outline: none;
          position: relative;
        }
      `}</style>
      </div>
    );
  }
}

export default PaneComponent;
