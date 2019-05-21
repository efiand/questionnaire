import functions from './functions';
import blocks from '../blocks/blocks';

Object.keys(blocks).forEach((selector) => {
  functions.applyClass(selector, blocks[selector]);
});
