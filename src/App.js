import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => {
          return <Route key={route.path} path={route.path} element={<route.element />} />
        })}
      </Routes>
    </BrowserRouter>
  )
}
