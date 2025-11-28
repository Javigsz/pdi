import { useState } from 'react'
import { useLocation } from 'wouter'
import Button from './Button'

function moreInfo () {
  const [, setLocation] = useLocation()
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-8 p-4'>
        <h1 className='text-4xl font-bold'>¿QUÉ ES <span className=' font-press-start'>PDI</span>?</h1>
        <Button
          onClick={() => {
            setShowInfo(true)
            setTimeout(() => {
              window.scrollTo({ top: 700, behavior: 'smooth' })
            }, 100)
          }}
        > +
        </Button>
        {showInfo && (
          <div className='flex flex-col items-center justify-centermax-w-[80%]'>
            <p className='text-center text-sm md:mx-20'>¿No estás cansad@ de apuntar todas tus series y películas pendientes en un mísero bloc de notas?
              ¿No quieres tener cinco webs distintas para buscar información sobre tus series favoritas?
              <strong> PDI</strong> es una aplicación agradable, simple y rápida que te permite llevar un registro de tus series, películas favoritas y más.
            </p>
            <div className='flex flex-col justify-center items-center max-w-[80%]'>
              <div className='md:mx-20 my-10 flex flex-col justify-center items-center'>
                <div className='flex items-center justify-center hover:scale-110 transition-all hover:z-20'>
                  <video className='hover:border-2 hover:border-white' src='/pdi1.mp4' autoPlay loop muted alt='Video' />
                </div>
                <p className='text-center text-sm mt-2'>Busca y guarda una nueva serie/película/etc. y guárdala para ti.</p>
              </div>
              <div className='md:mx-20 my-10 flex flex-col justify-center items-center'>
                <div className='flex items-center justify-center hover:scale-110 transition-all hover:z-20'>
                  <video className='hover:border-2 hover:border-white' src='/pdi2.mp4' autoPlay loop muted alt='Video' />
                </div>
                <p className='text-center text-sm mt-2'> Cambia el estado de tus series o busca más información sobre ellas.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {showInfo && (
        <>
          <div className='flex flex-col items-center justify-center max-w-[80%]'>
            <p>Si quieres saber más</p>
            <div className='flex items-center justify-center gap-2 mt-2'>
              <button
                className='bg-[#f25f4c] text-white p-2 rounded-md w-full hover:shadow-white hover:shadow-sm'
                onClick={() => setLocation('/contact')}
              >
                Contacto
              </button>
              <button
                className='bg-[#f25f4c] text-white p-2 rounded-md w-full hover:shadow-white hover:shadow-sm'
                onClick={() => setLocation('/help')}
              >
                Ayuda
              </button>
            </div>
            <button
              className='p-6 bg-[#f25f4c] text-white rounded-md mt-4 w-full hover:shadow-white hover:shadow-sm mb-10'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Iniciar Sesión ↑
            </button>
          </div>
        </>
      )}

    </>
  )
}

export default moreInfo
