import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../bundle/output.css';
import DashboardContainer from '../client/containers/DashboardContainer';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';

export default function App() {
  return (
    <div className='bg-white h-screen'>
      <Router>
        <div>
          <Routes >
            <Route path='/' element={<SignIn />}/>
            <Route path='/dashboard' element={<DashboardContainer />}/>
            <Route path='/signup' element={<SignUp />}/>
            
          </Routes>
        </div>
      </Router>

      {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
    </div>
  )
}
