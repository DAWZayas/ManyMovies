import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

import init from './utils/init';

require('./style.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');
import instantclick from 'instantclick';
instantclick.init();

const store = init();

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);
