import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import { App } from 'containers'
import { store } from 'store'

export const Application = (App, _store) => (
  <AppContainer>
    <Provider {..._store}>
      <App />
    </Provider>
  </AppContainer>
);

const AppElement = () => document.getElementById('app');

render(
  Application(App, store),
  AppElement()
);

if (module.hot) {
  module.hot.accept(() => {
    const App = require('./containers/App/App.js').default;
    const __store = window.store = store;

    render(
      Application(App, __store),
      AppElement()
    );
  });
}
