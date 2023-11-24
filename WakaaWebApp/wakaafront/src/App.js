import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AdminLoginPage from './components/commons/AdminLoginPage';
import UserLoginPage from './components/commons/UsersLoginPage';
import NotFoundPage from './components/commons/NotFoundPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            /* Connexion aux Comptes entreprises et administration de Waka'a */
          }
          <Route path='/administration/login' element={<AdminLoginPage/>} />
          <Route path='/entreprises/login' element={<UserLoginPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
