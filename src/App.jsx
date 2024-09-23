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
import UpdateSchedule from './pages/IT21211232/updateSchedule/UpdateSchedule.jsx';

//pages akila
import AssignCollectors from './pages/IT21832826/assign-collectors/assign-collectors.jsx';
import ViewData from './pages/IT21832826/view-all-data/view-data.jsx';
import PaymentRate from './pages/IT21832826/payment-rate/payment-rate.jsx';

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
                  <Route path='/userscheduleupdate' element={<UpdateSchedule/>}/>
                  <Route path='/collectordashboard' element={<AssignCollectors/>}/>
                  <Route path='/viewdata' element={<ViewData/>}/>
                  <Route path='/paymentrate' element={<PaymentRate />}/>
              </Routes>
            </Router>
          </div>
    </GlobalDataContextProvider>
  )
}

export default App
