import global from './global';
import { getCurrentPages } from './pageHub';

let appInstance = null;

class App {
  constructor(config = {}) {
    const appEventEmitter = require('@core/app');

    // copy all config key-value to app
    Object.assign(this, config);

    // lifecycle
    const { onLaunch, onShow, onHide } = config;

    if (typeof onLaunch === 'function') {
      appEventEmitter.on('launch', onLaunch.bind(this));
    }

    if (typeof onShow === 'function') {
      appEventEmitter.on('show', onShow.bind(this));
    }

    if (typeof onHide === 'function') {
      appEventEmitter.on('hide', onHide.bind(this));
    }
  }
}

export function getApp() {
  return appInstance;
}

// Register global object at runtime
global.getApp = getApp;
global.getCurrentPages = getCurrentPages;

export default function createApp(config) {
  if (getApp() !== null) {
    throw new Error('Only one App create allowed per miniapp.');
  }

  return appInstance = new App(config);
}

