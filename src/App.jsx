import './App.css'
import Header from './components/Header'
import MainBoard from './components/Board/MainBoard'
import Login from './components/Login'
import { data } from './mocks/data'
import { useState, useContext } from 'react'
import { FiltersContext } from './context/filters'
import { Route, Redirect } from 'wouter'

function App () {
  const [tablesData, setTablesData] = useState(data)
  const { isLoggedIn, setIsLoggedIn } = useContext(FiltersContext)

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    if (!isLoggedIn) {
      return <Redirect to='/login' />
    }
    return <Component {...rest} />
  }

  return (
    <>
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
    </>
  )
}

export default App
