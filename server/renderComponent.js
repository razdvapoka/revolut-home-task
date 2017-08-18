import favIconUrl from './fav.ico'
import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'

export default (
  options,
  initialState,
  component
) => (
  `<!DOCTYPE html>
  <html>
      <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>${options.title}</title>
          <link href="${favIconUrl}" rel="icon" type="image/x-icon"/>
          <link href="${options.stylePath}" media="all" rel="stylesheet" type="text/css"/>
      </head>
      <body>
          <div id="${options.id}">${component && renderToString(component)}</div>
          <script>
              window.__initialState__ = ${serialize(initialState)}
          </script>
          <script src=${options.vendorBundlePath}></script>
          <script src=${options.appBundlePath}></script>
      </body>
  </html>`
)
