import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Main} from './zadanie_rekrutacyjne';

import { store } from './app/mainStore';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>
  ,
  document.getElementById('root')
);
