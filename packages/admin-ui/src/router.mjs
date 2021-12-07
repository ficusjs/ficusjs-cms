import { createRouter } from '@ficusjs/router'

// create list of routes
const routes = [
  { path: '/', component: 'fcms-auth-page' },
  {
    path: '/collections/:name/editor/:slug',
    action (context, params) {
      return `<fcms-editor-page name="${params.name}" slug="${params.slug}"></fcms-editor-page>`
    }
  }
]

export const router = createRouter(routes, '#fcms-router-outlet', {
  mode: 'hash'
})
