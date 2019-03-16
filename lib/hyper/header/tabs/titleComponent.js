import React from 'react';

class TitleComponent extends React.PureComponent {
  constructor() {
    super();
    // console.log('TitleComponent');
  }

  renderTitle(title) {
    // console.log('renderTitle', title);
    return (
      <div className="tabs_title">
        {title}
        <style jsx>{`
          .tabs_title {
            text-align: center;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-left: 76px;
            padding-right: 76px;
          }
        `}</style>
      </div>
    );
  }

  render() {
    let title = this.props.title;
    if (title === '' || title === undefined) {
      title = 'hyper';
    }
    // console.log(title);
    return this.renderTitle(title);
  }
}

export default TitleComponent;
