import React from 'react';
import TermComponent from './termComponent';

// TODO: Make terms render for activeTab;
class TermsComponent extends React.Component {
  constructor() {
    super();
  }
    
  renderTerms(terms, activeEvent) {
    const _terms = terms.terms;
    if (_terms.length == 1) {
      const term = {
        term : _terms[0],
        activeEvent
      };
      return <TermComponent {...term} />
    }

    const sizes = new Array(_terms.length).fill(1 / _terms.length);
    return (
      <div className={`panes ${terms.direction}`}>
      {_terms.map((term, i) => {
        const sizeProperty = terms.direction === 'horizontal' ? 'height' : 'width';
        const style = {
          // flexBasis doesn't work for the first horizontal pane, height need to be specified
          [sizeProperty]: sizes[i] * 100 + '%',
          flexBasis: sizes[i] * 100 + '%',
          flexGrow: 0,
          background: term.backgroundColor
        };
        const _term = {
          term,
          activeEvent
        };
        return (
          <div
            key={`pane-${term.uid}`}
            className="pane"
            style={style}
          >
            <TermComponent {..._term} />
          </div>
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
        
        .pane {
          flex: 1;
          outline: none;
          position: relative;
        }
        
        
      `}</style>
      </div>
    );
    // const [first, ...rest] = groups;
    // if (rest.length === 0) {
    //   return first;
    // }
    // 
    // const direction = this.props.termGroup.direction.toLowerCase();
    // return (
    //   <SplitPane
    //     direction={direction}
    //     sizes={this.props.termGroup.sizes}
    //     onResize={this.props.onTermGroupResize}
    //     borderColor={this.props.borderColor}
    //   >
    //     {groups}
    //   </SplitPane>
    // );
  }
    
  render() {
    const {activeTab, terms, onActive} = this.props;
    console.log(this.props);
    const _terms = terms[activeTab];
    return (
      <div className={`terms`}>
        {_terms != null && this.renderTerms(_terms, onActive)}
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
