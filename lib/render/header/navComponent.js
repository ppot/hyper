import React from 'react';

import TabsComponent_ from './tabs/tabsComponent';

const isMac = /Mac/.test(navigator.userAgent);

class NavComponent extends React.PureComponent {
  constructor() {
    super();
    // console.log('NavComponent');
  }

  render() {
    // console.log('render NavComponent');
    const props = this.props;
    const hide = !isMac && props.tabs.all.length === 1;

    return (
      <nav className={`navComponent ${hide ? 'navComponentHidden' : ''}`}>
        <TabsComponent_ {...props} />
        <style jsx>{`
          .navComponent {
            font-size: 12px;
            height: 34px;
            line-height: 34px;
            vertical-align: middle;
            color: #9b9b9b;
            cursor: default;
            position: relative;
            -webkit-user-select: none;
            -webkit-app-region: ${isMac ? 'drag' : ''};
            top: ${isMac ? '0px' : '34px'};
          }

          .navComponentHidden {
            display: none;
          }
        `}</style>
      </nav>
    );
  }
}

export default NavComponent;
