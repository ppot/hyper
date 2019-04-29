import React from 'react';
import PaneComponent from './paneComponent';

class PanesComponent extends React.PureComponent {
  constructor() {
    super();
  }
  
  render() {
    console.log(this.props);
    const {terms, render} = this.props
    const {uid, direction, nodes} = terms;
    const sizes = new Array(nodes.length).fill(1 / nodes.length);
    const sizeProperty = direction === 'horizontal' ? 'height' : 'width';
    return (
      <div key={`nodes-${uid}`}
      className={`panes ${direction}`}>
      {nodes.map((t, i) => {
        const style = {
          // flexBasis doesn't work for the first horizontal pane, height need to be specified
          [sizeProperty]: sizes[i] * 100 + '%',
          flexBasis: sizes[i] * 100 + '%',
          flexGrow: 0
        };
        const term = nodes[i];
        return (
          <PaneComponent 
            key={`pane-${term}`} 
            {...{uid: term, style, render}} 
          />
        );
      })}
      <style jsx>{` 
        .panes {
          display: flex;
          flex: 1;
          outline: none;
          position: relative;
          width: 100%;
          height: 100%;
        }
    
        .vertical {
          flex-direction: row;
        }
    
        .horizontal {
          flex-direction: column;
        }
      `}</style>
      </div>
    );
  }
}

export default PanesComponent;
