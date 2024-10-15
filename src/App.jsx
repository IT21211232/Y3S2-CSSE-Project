import { useState } from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import './App.css'

// context provider
import GlobalDataContextProvider from './context/globalData'

// components
import SideNav from './components/common/sidenav/SideNav'

// pages
import Userdashboard from './pages/IT21211232/dashboard/dashboard.jsx'
import ScheduleCollection from './pages/IT21211232/schedule/schedulecollection.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GlobalDataContextProvider>
          <div className='main flex h-screen w-full'>
            <Router>
            <SideNav type={'user'}/>
              <Routes>    
                  <Route path='/userdashboard' element={<Userdashboard/>}/>
                  <Route path='/userschedule' element={<ScheduleCollection/>}/>
              </Routes>
            </Router>
          </div>
    </GlobalDataContextProvider>
  )
}

export default App
