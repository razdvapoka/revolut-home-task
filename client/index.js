import { AppContainer } from 'react-hot-loader'
import React from 'react'
import Root from './components/Root'
import { render } from 'react-dom'

const renderApp = () => render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('app')
)

renderApp()

// Enable Webpack hot module replacement for Root component
if (module.hot) {
  module.hot.accept('./components/Root', renderApp)
}
