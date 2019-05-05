import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './js/reducers';

import App from './js/containers/App';

import './css/index.sass';

/** Material UI */
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    {/* <MuiThemeProvider> */}
    <App />
    {/* </MuiThemeProvider> */}
  </Provider>,
  document.getElementById('root')
);
