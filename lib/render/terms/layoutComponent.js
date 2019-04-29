import React from 'react';
import PaneComponent from './layout/paneComponent';
import PanesContainer from './layout/panesContainer';

class LayoutComponent extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    const {terms, childs, render} = this.props
    const {uid, direction, nodes} = terms;
    let sizes = new Array(nodes.length).fill(1 / nodes.length);
    
    if(childs) { 
      sizes = new Array(nodes.length + childs.length).fill(1 / (nodes.length+childs.length));
    }

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
      {childs.map((t, i) => {
        return (
          <PanesContainer     
          key={`panes-${t}`} 
          {...{uid: t, render}} 
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

export default LayoutComponent;