import {
  RouterContext,
  createMemoryHistory,
  match
} from 'react-router'
import { PAGE_NOT_FOUND_PATHNAME } from './consts'
import { Provider } from 'react-redux'
import React from 'react'
import asset from './asset'
import { configureStore } from '../client/store'
import httpStatus from 'http-status-codes'
import renderComponent from './renderComponent'
import routes from '../client/routes'
import { syncHistoryWithStore } from 'react-router-redux/lib'

const initApp = (renderProps, store) => ({
  options: {
    title: `converter`,
    id: `app`,
    stylePath: asset.url(`app`, `css`),
    appBundlePath: asset.url(`app`, `js`),
    vendorBundlePath: asset.url(`vendor`, `js`)
  },

  component: (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  )
})

const respondWith = ({ renderProps, res, store, status }) => {
  const { options, component } = initApp(renderProps, store)
  return res
    .status(status)
    .send(renderComponent(options, store.getState(), component))
}

const isPageNotFound =
  renderProps => renderProps.location.pathname === PAGE_NOT_FOUND_PATHNAME

const respondWithServerError = ({ store, ...rest }) => {
  respondWith({
    store,
    status: httpStatus.INTERNAL_SERVER_ERROR,
    ...rest
  })
}

const route = (req, res) => {
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match(
    {
      history,
      routes,
      location: req.url
    },
    (error, redirectLocation, renderProps) => {
      if (error) {
        console.error(`Router error:`, error)
        respondWithServerError({ renderProps, res, store })
      } else if (redirectLocation) {
        res.redirect(
          httpStatus.MOVED_TEMPORARILY,
          redirectLocation.pathname + redirectLocation.search
        )
      } else {
        try {
          return respondWith({
            renderProps,
            res,
            store,
            status: isPageNotFound(renderProps)
              ? httpStatus.NOT_FOUND
              : httpStatus.OK
          })
        } catch (ssrError) {
          console.log(`Server rendering error: `, ssrError)
          respondWithServerError({ renderProps, res, store })
        }
      }
    }
  )
}

export default route
