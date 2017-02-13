import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import { App } from 'containers'
import { store } from 'store'

export const Application = (App) => (
  <AppContainer>
    <Provider {...store}>
      <App />
    </Provider>
  </AppContainer>
);

const AppElement = () => document.getElementById('app');

render(
  Application(App),
  AppElement()
);

if (module.hot) {
  module.hot.accept(() => {
    const App = require('./containers/App/App.js').default;

    render(
      Application(App),
      AppElement()
    );
  });
}
