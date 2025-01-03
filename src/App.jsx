import './App.css'
import Header from './components/Header'
import SideMenu from './components/SideMenu'
import MainBoard from './components/Board/MainBoard'

function App () {
  return (
    <>
      <header className='text-white'>
        <Header />
      </header>
      <div className='flex text-white'>
        <SideMenu />
        <MainBoard />
      </div>
    </>
  )
}

export default App
