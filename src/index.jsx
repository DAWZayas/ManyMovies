import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

import init from './utils/init';

require('./style.css');
require('bootstrap/dist/css/bootstrap.min.css');
//require('https://fonts.googleapis.com/icon?family=Material+Icons');

const store = init();

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);
