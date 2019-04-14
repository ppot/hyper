import React from 'react';
import {Terminal} from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';
import * as Color from 'color';

Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(winptyCompat);

// map old hterm constants to xterm.js
const CURSOR_STYLES = {
  BEAM: 'bar',
  UNDERLINE: 'underline',
  BLOCK: 'block'
};

const isWebgl2Supported = (() => {
  let isSupported = window.WebGL2RenderingContext ? undefined : false;
  return () => {
    if (isSupported === undefined) {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2', {depth: false, antialias: false});
      isSupported = gl instanceof window.WebGL2RenderingContext;
    }
    return isSupported;
  };
})();


const getTermOptions = props => {
  // Set a background color only if it is opaque
  const needTransparency = Color(props.backgroundColor).alpha() < 1;
  const backgroundColor = needTransparency ? 'transparent' : props.backgroundColor;

  let useWebGL = false;
  if (props.webGLRenderer) {
    if (needTransparency) {
      // eslint-disable-next-line no-console
      console.warn(
        'WebGL Renderer has been disabled since it does not support transparent backgrounds yet. ' +
          'Falling back to canvas-based rendering.'
      );
    } else if (!isWebgl2Supported()) {
      // eslint-disable-next-line no-console
      console.warn('WebGL2 is not supported on your machine. Falling back to canvas-based rendering.');
    } else {
      useWebGL = true;
    }
  }
  // Term.reportRenderer(props.uid, useWebGL ? 'WebGL' : 'Canvas');

  return {
    macOptionIsMeta: props.modifierKeys.altIsMeta,
    scrollback: props.scrollback,
    cursorStyle: CURSOR_STYLES[props.cursorShape],
    cursorBlink: props.cursorBlink,
    fontFamily: props.fontFamily,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    fontWeightBold: props.fontWeightBold,
    lineHeight: props.lineHeight,
    letterSpacing: props.letterSpacing,
    allowTransparency: needTransparency,
    macOptionClickForcesSelection: props.macOptionSelectionMode === 'force',
    // HACK: Terminal.setOption breaks if we don't apply these in this order
    // TODO: The above notice can be removed once this is addressed:
    // https://github.com/xtermjs/xterm.js/pull/1790#issuecomment-450000121
    rendererType: useWebGL ? 'webgl' : 'canvas',
    experimentalCharAtlas: useWebGL ? 'webgl' : 'dynamic',
    theme: {
      foreground: props.foregroundColor,
      background: backgroundColor,
      cursor: props.cursorColor,
      cursorAccent: props.cursorAccentColor,
      selection: props.selectionColor,
      black: props.colors.black,
      red: props.colors.red,
      green: props.colors.green,
      yellow: props.colors.yellow,
      blue: props.colors.blue,
      magenta: props.colors.magenta,
      cyan: props.colors.cyan,
      white: props.colors.white,
      brightBlack: props.colors.lightBlack,
      brightRed: props.colors.lightRed,
      brightGreen: props.colors.lightGreen,
      brightYellow: props.colors.lightYellow,
      brightBlue: props.colors.lightBlue,
      brightMagenta: props.colors.lightMagenta,
      brightCyan: props.colors.lightCyan,
      brightWhite: props.colors.lightWhite
    }
  };
};


class TermComponent extends React.PureComponent {
  constructor() {
    super();
    this.termRef = null;
    this.termWrapperRef = null;
    this.onTermWrapperRef = this.onTermWrapperRef.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.disposableListeners = [];
  }

  componentDidMount() {
    const {props} = this;
    this.termOptions = getTermOptions(props.render);
    this.xterm = props.xterm || new Terminal(); // options
    console.log(this);
    console.log(props);
    // The parent element for the terminal is attached and removed manually so
    // that we can preserve it across mounts and unmounts of the component
    this.termRef = props.xterm ? props.xterm._core._parent : document.createElement('div');
    this.termWrapperRef.appendChild(this.termRef);

    if (!props.xterm) {
      this.xterm.attachCustomKeyEventHandler(this.keyboardHandler);
      this.xterm.open(this.termRef);
      this.xterm.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
      this.xterm.webLinksInit();
      this.xterm.winptyCompatInit();
    }

    if (props.term.active) {
      this.xterm.focus();
    }

    // if (props.onTitle) {
    //   this.disposableListeners.push(this.xterm.addDisposableListener('title', props.onTitle));
    // }
    // 
    // if (props.onActive) {
    //   this.disposableListeners.push(this.xterm.addDisposableListener('focus', props.onActive));
    // }
    // 
    if (props.onData) {
      this.disposableListeners.push(this.xterm.addDisposableListener('data', props.onData));
    }
    
    if (props.onResize) {
      this.disposableListeners.push(
        this.xterm.addDisposableListener('resize', ({cols, rows}) => {
          props.onResize(cols, rows);
        })
      );
    }
    
    if (props.onCursorMove) {
      this.disposableListeners.push(
        this.xterm.addDisposableListener('cursormove', () => {
          const cursorFrame = {
            x: this.xterm._core.buffer.x * this.xterm._core.renderer.dimensions.actualCellWidth,
            y: this.xterm._core.buffer.y * this.xterm._core.renderer.dimensions.actualCellHeight,
            width: this.xterm._core.renderer.dimensions.actualCellWidth,
            height: this.xterm._core.renderer.dimensions.actualCellHeight,
            col: this.xterm._core.buffer.y,
            row: this.xterm._core.buffer.x
          };
          props.onCursorMove(cursorFrame);
        })
      );
    }
  }
  
  onMouseUp(e) {
    this.props.activeEvent(this.props.term.uid, this.props.activeNode);
    if (this.props.quickEdit && e.button === 2) {
      if (this.xterm.hasSelection()) {
        clipboard.writeText(this.term.getSelection());
        this.xterm.clearSelection();
      }
    } else if (this.props.copyOnSelect && this.xterm.hasSelection()) {
      clipboard.writeText(this.xterm.getSelection());
    }
  }
  
  fitResize() {
    if (!this.termWrapperRef) {
      return;
    }
    this.xterm.fit();
  }

  componentWillReceiveProps(nextProps) {
    
  }
  
  onTermWrapperRef(component) {
    console.log(component);
    this.termWrapperRef = component;

    if (component) {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeTimeout) {
          return;
        }
        this.resizeTimeout = setTimeout(() => {
          delete this.resizeTimeout;
          this.fitResize();
        }, 0);
      });
      this.resizeObserver.observe(component);
    } else {
      this.resizeObserver.disconnect();
    }
  }

  componentWillUnmount() {
    
  }

  render() {
    const {term, activeEvent} = this.props;
    const active = term.active ? 'active' : 'not';
    return (
      <div
        className={`term_fit`}
        onClick={this.handleClick}
        onMouseUp={this.onMouseUp}
      >
      <div ref={this.onTermWrapperRef} className="term_wrapper" />
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
