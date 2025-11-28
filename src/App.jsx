import './App.css'
import Header from './components/Header'
import MainBoard from './components/Board/MainBoard'
import Login from './components/Login'
import Help from './components/Help'
import Contact from './components/Contact'
import { useContext } from 'react'
import { Route, Switch } from 'wouter'
import { FiltersProvider } from './context/filters.jsx'
import { AuthContext } from './context/authContext.jsx'
import { DataProvider } from './context/dataContext.jsx'
import UserPDI from './components/UserPDI.jsx'
import Loading from './components/Loading.jsx'

function App () {
//   const [tablesData, setTablesData] = useState(data)
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <FiltersProvider>
        <DataProvider>
          <div className='scanlines' />
          <div className='intro-wrap'>
            <div className='noise' />
            <div className='noise noise-moving' />
            <div className='time'>--:--</div>
            <div className='recordSpeed'>SLP 0:00:00</div>
          </div>
          <header className='text-white font-roboto-slab'>
            <Header />
          </header>
          <Loading />
          <main className='flex text-white font-roboto-slab justify-center relative z-[1000] '>
            <Switch>
              <Route path='/contact'> <Contact /> </Route>
              <Route path='/help'> <Help /> </Route>
              <Route path='/user/:username'>
                {params => <UserPDI username={params.username} />}
              </Route>
              <Route path='/'>
                {() => {
                  // if (loading) {
                  //   return (
                  //     <div className='pt-10'>
                  //       <LoaderSkeleton />
                  //     </div>
                  //   )
                  // Display a loading spinner or placeholder
                  // }
                  return !isLoggedIn ? <Login /> : <MainBoard />
                }}
              </Route>
              <Route> <h1>404 not found</h1> </Route>
            </Switch>
          </main>
        </DataProvider>
      </FiltersProvider>
    </>
  )
}

export default App
