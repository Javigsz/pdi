import './App.css'
import Header from './components/Header'
import SideMenu from './components/SideMenu'
import MainBoard from './components/Board/MainBoard'
import { data } from './mocks/data'
import { useState } from 'react'

function App () {
  const [tablesData, setTablesData] = useState(data)

  return (
    <>
      <header className='text-white'>
        <Header />
      </header>
      <div className='flex text-white'>
        <SideMenu />
        <MainBoard data={tablesData} setData={setTablesData} />
      </div>
    </>
  )
}

export default App
