import React from 'react';

// import {getTabProps} from '../../../utils/plugins';

import TitleComponent from './TitleComponent';
import TabComponent from '../tab/tabComponent';

const isMac = /Mac/.test(navigator.userAgent);

class TabsComponent extends React.PureComponent {
  constructor() {
    super();
    // console.log('TabsComponent');
  }

  renderShim(borderColor) {
    // console.log('renderShim', borderColor);
    return (
      <div key="shim" style={{borderColor}} className="tabs_borderShim">
        <style jsx>{`
          .tabs_borderShim {
            position: absolute;
            width: 76px;
            bottom: 0;
            border-color: #ccc;
            border-bottom-style: solid;
            border-bottom-width: 1px;
          }
        `}</style>
      </div>
    );
  }

  renderTabs(props) {
    const {tabs, borderColor, onChange, onClose} = props;
    // console.log('renderTabs');
    return (
      <ul key="list" className="tabs_list">
        {tabs.all.map((tab, i) => {
          // console.log(tab);
          const _tab = {
            title: tab.title === '' ? 'Shell' : tab.title,
            isFirst: i === 0,
            isLast: tabs.length - 1 === i,
            isActive: tab.uid === tabs.active,
            hasActivity: false,
            borderColor,
            onSelect: onChange.bind(null, tab.uid),
            onClose: onClose.bind(null, tab.uid)
          };
          return <TabComponent key={`tab-${tab.uid}`} {..._tab} />;
        })}
        <style jsx>{`
          .tabs_list {
            max-height: 34px;
            display: flex;
            flex-flow: row;
            margin-left: ${isMac ? '76px' : '0'};
          }
        `}</style>
      </ul>
    );
  }

  render() {
    // console.log('render TabsComponent');
    const {tabs, borderColor} = this.props;

    if (tabs.all.length === 1 && isMac) {
      const title = tabs.all[0].title;
      return <TitleComponent {...title} />;
    }
    if (tabs.all.length > 1) {
      return [this.renderTabs(this.props), isMac && this.renderShim(borderColor)];
    }
    return null;
  }
}

export default TabsComponent;
