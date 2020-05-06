import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container';
import {STORAGEKEY} from './utils/constant';
/**
 * @description this function initiates DOM rendering
 * @param {Object} config user given Config
 * @param {string} nodeid id reference of the element we are looking attaching dom
 */
function attachDOM (config, nodeid) {
  ReactDOM.render(<Container config ={config}/>, document.getElementById(nodeid));
}
/**
 * @description This is the function exposed to developer user for using
 * @param {Object} config user given config
 */
export default function smartSearch(config){
  // fetch and sanitise data, store into localstorage if not present
  if (!localStorage.getItem(STORAGEKEY)) {
    fetch(config.dataurl).then(res=> res.json()).then(userData => {
      localStorage.setItem(STORAGEKEY, JSON.stringify(userData));
      attachDOM(config, config.nodeid);
    });
  }else {
    // if local storage has the data present, use it
    attachDOM(config, config.nodeid);
  }
}
