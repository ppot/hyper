import React from 'react';

class TabComponent extends React.PureComponent {
  constructor() {
    super();
    // console.log('TabComponent');
    this.handleClick = this.handleClick.bind(this);
    this.state = {hovered: false};
  }

  toggleHovered(value) {
    this.setState({hovered: value});
  }

  handleClick(event) {
    const isLeftClick = event.nativeEvent.which === 1;
    const isMiddleClick = event.nativeEvent.which === 2;

    if (isLeftClick && !this.props.isActive) {
      this.props.onSelect();
    } else if (isMiddleClick) {
      this.props.onClose();
    }
  }

  render() {
    // console.log('render TabComponent');
    const {isFirst, isActive, isLast, hasActivity, borderColor} = this.props;
    const {hovered} = this.state;
    return (
      <React.Fragment>
        <li
          onMouseEnter={() => this.toggleHovered(true)}
          onMouseLeave={() => this.toggleHovered(false)}
          style={{borderColor}}
          className={`tab_tab ${isFirst ? 'tab_first' : ''} ${isActive ? 'tab_active' : ''}
            ${isFirst && isActive ? 'tab_firstActive' : ''} ${hasActivity ? 'tab_hasActivity' : ''}`}
        >
          <span
            className={`tab_text ${isLast ? 'tab_textLast' : ''} ${isActive ? 'tab_textActive' : ''}`}
            onClick={this.handleClick}
          >
            <span title={this.props.text} className="tab_textInner">
              {this.props.title}
            </span>
          </span>
          <i className={`tab_icon ${hovered ? 'tab_iconHovered' : ''}`} onClick={this.props.onClose}>
            <svg className="tab_shape">
              <use xlinkHref="./renderer/assets/icons.svg#close-tab" />
            </svg>
          </i>
        </li>
        <style jsx>{`
          .tab_tab {
            color: #ccc;
            border-color: #ccc;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-left-width: 1px;
            border-left-style: solid;
            list-style-type: none;
            flex-grow: 1;
            position: relative;
          }

          .tab_tab:hover {
            color: #ccc;
          }

          .tab_first {
            border-left-width: 0;
            padding-left: 1px;
          }

          .tab_firstActive {
            border-left-width: 1px;
            padding-left: 0;
          }

          .tab_active {
            color: #fff;
            border-bottom-width: 0;
          }
          .tab_active:hover {
            color: #fff;
          }

          .tab_hasActivity {
            color: #50e3c2;
          }

          .tab_hasActivity:hover {
            color: #50e3c2;
          }

          .tab_text {
            transition: color 0.2s ease;
            height: 34px;
            display: block;
            width: 100%;
            position: relative;
            overflow: hidden;
          }

          .tab_textInner {
            position: absolute;
            left: 24px;
            right: 24px;
            top: 0;
            bottom: 0;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .tab_icon {
            transition: opacity 0.2s ease, color 0.2s ease, transform 0.25s ease, background-color 0.1s ease;
            pointer-events: none;
            position: absolute;
            right: 7px;
            top: 10px;
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 100%;
            color: #e9e9e9;
            opacity: 0;
            transform: scale(0.95);
          }

          .tab_icon:hover {
            background-color: rgba(255, 255, 255, 0.13);
            color: #fff;
          }

          .tab_icon:active {
            background-color: rgba(255, 255, 255, 0.1);
            color: #909090;
          }

          .tab_iconHovered {
            opacity: 1;
            transform: none;
            pointer-events: all;
          }

          .tab_shape {
            position: absolute;
            left: 4px;
            top: 4px;
            width: 6px;
            height: 6px;
            vertical-align: middle;
            fill: currentColor;
            shape-rendering: crispEdges;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default TabComponent;
