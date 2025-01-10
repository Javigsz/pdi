import './App.css'
import Header from './components/Header'
import MainBoard from './components/Board/MainBoard'
import Login from './components/Login'
import { data } from './mocks/data'
import { useState } from 'react'
import { Route, Redirect } from 'wouter'
import { FiltersProvider } from './context/filters.jsx'

function App () {
  const [tablesData, setTablesData] = useState(data)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    if (!isLoggedIn) {
      return <Redirect to='/' />
    }
    return <Component {...rest} />
  }

  return (
    <>
      <FiltersProvider>
        <header className='text-white font-roboto-slab'>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main className='flex text-white font-roboto-slab justify-center'>
          <Route
            path='/dashboard'
            component={() => <ProtectedRoute component={MainBoard} data={tablesData} setData={setTablesData} />}
          />
          <Route path='/help' component={() => <h1>Help</h1>} />
          <Route path='/contact' component={() => <><h1>Contact</h1></>} />
          <Route path='/login' component={() => (isLoggedIn ? <Redirect to='/dashboard' /> : <Login setIsLoggedIn={setIsLoggedIn} />)} />
          <Route path='/' component={() => (isLoggedIn ? <Redirect to='/dashboard' /> : <Login setIsLoggedIn={setIsLoggedIn} />)} />
        </main>
      </FiltersProvider>
    </>
  )
}

export default App
