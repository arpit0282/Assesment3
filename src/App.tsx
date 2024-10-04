import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Update from './pages/Update';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/update' element={<Update/>}/>
          {/* <Route path='/profile' element={<Profile/>}/> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
