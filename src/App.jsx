import './App.css'
import Header from './components/Header'
import MainBoard from './components/Board/MainBoard'
import Login from './components/Login'
import { data } from './mocks/data'
import { useState } from 'react'
import { Route } from 'wouter'
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
        <main className='flex text-white font-roboto-slab justify-center'>
          <Route path='/contact' component={() => <h1>Contact</h1>} />
          <Route path='/help' component={() => <h1>Help</h1>} />
          <Route
            path='/'
            component={() =>
              !isLoggedIn
                ? (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                  )
                : (
                  <MainBoard data={tablesData} setData={setTablesData} />
                  )}
          />

        </main>
      </FiltersProvider>
    </>
  )
}

export default App
