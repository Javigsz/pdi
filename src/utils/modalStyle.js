export const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Default width for small screens
    maxHeight: '70svh',
    backgroundColor: '#0f0e17',
    '@media (min-width: 768px)': { // md breakpoint
      width: '500px'
    },
    '@media (min-width: 1024px)': { // lg breakpoint
      width: '600px'
    }
  }
}
