import './App.css';
import Signup from './signup.jsx';
import Signin from './signin.jsx';

import {useNavigate,BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Classroom from './classroom.jsx';

import Protectedroute from './Protectedroute.jsx';

const App = () => {

  return (
    <>
  <div className='bg'>
    <Router>
      <Routes>
       <Route path="/" element={<Protectedroute> <Classroom /></Protectedroute>} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  
    </div>
   
    </>
  );
};

export default App;
