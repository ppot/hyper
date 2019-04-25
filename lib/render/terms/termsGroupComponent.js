import React from 'react';

class TermsGroupComponent extends React.PureComponent {
  constructor() {
    super();
    console.log('TermsGroupComponent');
  }
  
  render() {
    console.log(this.props);
    const {uid, direction} = this.props.group;
    console.log(uid, direction);
    return (
      <div key={`termsGroup-${uid}`}
      className={`panes ${direction}`}>
      alllo
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

export default TermsGroupComponent;