import React from 'react';
import TermComponent from './termComponent';
import StyleSheet_ from './style-sheet';

class TermsComponent extends React.Component {
  constructor() {
    super();
  }

  renderNode(termNode, sizes, position, displayDivider, direction, sessions, onData, activeEvent, onResize, activeNode, render) {
    // console.log(displayDivider, direction);
    const sizeProperty = direction === 'horizontal' ? 'height' : 'width';
    const style = {
      // flexBasis doesn't work for the first horizontal pane, height need to be specified
      [sizeProperty]: sizes[position] * 100 + '%',
      flexBasis: sizes[position] * 100 + '%',
      flexGrow: 0
      // background: termNode.backgroundColor
    };
    const _term = {
      term: termNode,
      session : sessions[termNode.uid],
      onData,
      activeEvent,
      onResize,
      activeNode,
      render
    };

    return [
      <div key={`term-${termNode.uid}`} className="pane" style={style}>
        <TermComponent {..._term} />
        <style jsx>{`
          .pane {
            flex: 1;
            outline: none;
            position: relative;
          }
        `}</style>
      </div>,
      displayDivider ? (
        <div
          key="divider"
          style={{backgroundColor: termNode.uid}}
          className={`divider divider_${direction}`}
        >
        <style jsx>{`
          .divider {
            box-sizing: border-box;
            z-index: 1;
            background-clip: padding-box;
            flex-shrink: 0;
          }
          
          .divider_vertical {
            border-left: 5px solid rgba(255, 255, 255, 0);
            border-right: 5px solid rgba(255, 255, 255, 0);
            width: 11px;
            margin: 0 -5px;
            cursor: col-resize;
          }

          .divider_horizontal {
            height: 11px;
            margin: -5px 0;
            border-top: 5px solid rgba(255, 255, 255, 0);
            border-bottom: 5px solid rgba(255, 255, 255, 0);
            cursor: row-resize;
            width: 100%;
          }
        `}</style>
        </div>
      ): null
    ];
  }

  renderNodesTerms(termsNode, termNode, terms, term, sessions, onData, activeEvent, onResize, render) {
    const _nodes = termsNode.nodes;
    const sizes = new Array(_nodes.length).fill(1 / _nodes.length);
    return (
      <div
       key={`terms-${termsNode.uid}`}
       className={`panes ${termsNode.direction}`}
      >
        {
          _nodes.map((t, i) => {
            const node = terms.nodes[t];
            if (node != null) {
              return this.renderNodesTerms(node, term[t], terms, term, sessions, onData, activeEvent, onResize, render);
            } else {
              const displayDivider = i < _nodes.length - 1;
              // console.log(displayDivider);
              return this.renderNode(term[t], sizes, i, displayDivider, termsNode.direction, sessions, onData, activeEvent, onResize, termsNode.uid, render);
            }
          })
        }
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

  renderTerms(terms, term, sessions, onData, activeEvent, onResize, render) {
    const _nodes = terms.nodes;
    const root = _nodes[terms.root];
    const rootNodes = root.nodes;
    const sizes = new Array(rootNodes.length).fill(1 / rootNodes.length);
    return (
      <div key={`terms-${root.uid}`}
      className={`panes ${root.direction}`}>
      {rootNodes.map((t, i) => {
        if (_nodes[t] != null && _nodes[t].parent != null) {
          return this.renderNodesTerms(_nodes[t], term[t], terms, term, sessions, onData, activeEvent, onResize, render);
          
        } else {
          const displayDivider = i < rootNodes.length - 1;
          console.log(displayDivider, i , rootNodes.length );
          return this.renderNode(term[t], sizes, i, displayDivider, root.direction, sessions, onData, activeEvent, onResize, root.uid, render);
        }
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

  render() {
    const {activeTab, terms, term, sessions, onData, onActive, onResize, render} = this.props;
    const _terms = terms[activeTab];
    return (
      <div className={`terms`}>
        {_terms != null && this.renderTerms(_terms, term, sessions, onData, onActive, onResize, render)}
        <StyleSheet_ />
        <style jsx>{`
          .terms {
            position: absolute;
            margin-top: 34px;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            color: #fff;
          }
      `}</style>
      </div>
    );
  }
}

export default TermsComponent;
