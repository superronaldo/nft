import React, { lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import useEagerConnect from 'hooks/useEagerConnect'
import Home from './views/Home'
import Header from './views/Header'

// const Home = lazy(() => import('./views/Home'))

const App: React.FC = () => {
  useEagerConnect()

  return (
    <div>
      <ResetCSS />
      <Header />
      <Home />
    </div>
  )
}

export default React.memo(App)
