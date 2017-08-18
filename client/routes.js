import { IndexRedirect, Redirect, Route } from 'react-router'
import App from './components/App'
import React from 'react'
import Converter from './components/Converter'

const Page500 = () => <div>500</div>
const Page404 = () => <div>404</div>

const routes = (
  <Route component={App} path='/' >
    <IndexRedirect to='converter' />
    <Route component={Converter} path='converter' />
    <Route component={Page500} path='500' />
    <Route component={Page404} path='404' />
    <Redirect from='*' to='404' />
  </Route>
)

export default routes
