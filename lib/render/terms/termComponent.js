import React from 'react';

// TODO: Make terms render sub-term when split is requested
class TermComponent extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    this.props.activeEvent(this.props.term.uid);
  }
      
  render() {
    const {term, activeEvent} = this.props;
    const active = term.active ? 'active' : 'not';
    return (
      <div
        className={`term_fit`}
        onClick={this.handleClick}
      >
        <div>
          <p>{term.uid}</p>
          <p>{active}</p>
        </div>
        <style jsx global>{`
          .term_fit {
            display: block;
            width: 100%;
            height: 100%;
          }

          .term_wrapper {
            /* TODO: decide whether to keep this or not based on understanding what xterm-selection is for */
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }
}

export default TermComponent;
