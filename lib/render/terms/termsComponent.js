import React from 'react';
import TermComponent from './termComponent';

class TermsComponent extends React.Component {
  constructor() {
    super();
  }
    
  renderTerms(terms, activeEvent) {
    console.log(terms);
    const _terms = terms.terms;
    if (_terms.length == 1) {
      const term = {
        term : _terms[0],
        activeEvent
      };
      return (
        <div
          key={`term-${term.uid}`}
          >
          <TermComponent {...term} />
        </div>
      );
    }
    const sizes = new Array(_terms.length).fill(1 / _terms.length);
    return (
      <div key={`terms-${terms.uid}`}
      className={`panes ${terms.direction}`}>
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
        
        if (term.terms) {
          return this.renderTerms(term.terms, activeEvent);
        } else {
          return (
            <div
              key={`term-${term.uid}`}
              className="pane"
              style={style}
            >
              <TermComponent {..._term} />
            </div>
          );
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
        
        .pane {
          flex: 1;
          outline: none;
          position: relative;
        }
      `}</style>
      </div>
    );
  }
    
  render() {
    const {activeTab, terms, onActive} = this.props;
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
