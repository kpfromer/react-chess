import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import pieces from './reducers/pieces';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

const Reducers = combineReducers({ pieces });

const store = createStore(
  Reducers,
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
