import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';

// Polyfill for structuredClone (required by fake-indexeddb)
// Better implementation that handles Dates
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj: any) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map((item: any) => global.structuredClone(item));

    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = global.structuredClone(obj[key]);
      }
    }
    return clonedObj;
  };
}

// Mock HTMLAudioElement for audio playback in tests
// jsdom doesn't implement play/pause methods
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.load = () => {};

// Mock readyState to indicate audio is ready (HAVE_ENOUGH_DATA = 4)
Object.defineProperty(window.HTMLMediaElement.prototype, 'readyState', {
  get() { return 4; },
  configurable: true
});
