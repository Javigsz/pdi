const Login = ({ setIsLoggedIn }) => {
  return (
    <>
      <div className='font-roboto-slab mt-12 border-top-4 border-white bg-[#0f0e17] p-4 rounded-md'>
        <form id='login-form' className='flex flex-col items-center mx-auto border-2 p-14 rounded-sm'>
          <label htmlFor='username'>Nombre Usuario:</label>
          <input type='text' id='username' name='username' required className='border-2' />

          <label htmlFor='password'>Contraseña:</label>
          <input type='password' id='password' name='password' required className='border-2' />

          <button disabled type='submit' className='bg-gray-800 text-white p-2 rounded-md mt-4 w-full'>Login</button>
          <button disabled type='submit' className='bg-gray-800 text-white p-2 rounded-md mt-4'>Register</button>
          <button onClick={() => setIsLoggedIn(true)} className='bg-[#f25f4c] text-white p-2 rounded-md mt-4 w-full'>Iniciar como invitado</button>
        </form>
      </div>
    </>
  )
}

export default Login
