import './App.css'
import Header from './components/Header'
import MainBoard from './components/Board/MainBoard'
import Login from './components/Login'
import Help from './components/Help'
import Contact from './components/Contact'
import { data } from './mocks/data'
import { useState } from 'react'
import { Route, Switch } from 'wouter'
import { FiltersProvider } from './context/filters.jsx'

function App () {
  const [tablesData, setTablesData] = useState(data)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <FiltersProvider>
        <header className='text-white font-roboto-slab'>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main className='flex text-white font-roboto-slab justify-center w-min-screen'>
          <Switch>
            <Route path='/contact'> <Contact /> </Route>
            <Route path='/help'> <Help /> </Route>
            <Route path='/'>
              {() =>
                !isLoggedIn
                  ? <Login setIsLoggedIn={setIsLoggedIn} />
                  : <MainBoard data={tablesData} setData={setTablesData} />}
            </Route>
            <Route> <h1>404 not found</h1> </Route>
          </Switch>
        </main>
      </FiltersProvider>
    </>
  )
}

export default App
