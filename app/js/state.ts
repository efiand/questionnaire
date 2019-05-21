import data from './data';

export default {
  ...data,
  isIe: /rident/.test(navigator.userAgent)
};
