import React from 'react'

import { Provider } from 'react-redux'
import { store } from './store/store'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'

import { AppHeader } from './cmps/app-layout/AppHeader'


export const App = () => {
  return (
    <Provider store={store}>
      <AppHeader />

      <BrowserRouter>
        <Routes>
          {routes.map(route => {
            return <Route key={route.path} path={route.path} element={<route.element />} />
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
