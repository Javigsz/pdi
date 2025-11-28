import '../myButton.css' // Importa tu archivo de estilos

const Button = ({ textColor = 'white', fontSize = '36px', children, onClick }) => {
  // Estilo dinámico para el color y el texto del botón
  const buttonStyle = {
    color: textColor, // Cambia el color del texto
    fontSize // Cambia el tamaño del texto
  }

  return (
    <div className='btn'>
      <a
        onClick={onClick} // Permite manejar clics
        style={buttonStyle}
      >
        {children}  {/* El texto o contenido del botón */}
      </a>
    </div>
  )
}

export default Button
