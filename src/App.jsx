import './App.css'
import Header from './components/Header'
import SideMenu from './components/SideMenu'
import MainBoard from './components/Board/MainBoard'

function App () {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className='h-full flex'>
        <SideMenu />
        <MainBoard />
      </div>
    </>
  )
}

export default App
