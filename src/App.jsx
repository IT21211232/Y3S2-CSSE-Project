import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideNav from './components/common/sidenav/SideNav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main'>
      <SideNav/>
    </div>
  )
}

export default App
