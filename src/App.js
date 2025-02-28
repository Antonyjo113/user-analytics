import React, {createContext, useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';


import './App.css';
import Login from './components/login/Login';
import Layout from './components/layout/Layout';
import User from './components/user/User';
import Analytics from './components/analytics/Analytics';


export const UserContext = createContext();

function App() {

  const[user, setUser] = useState(null)


  useEffect(() => {

    const userAuth =  sessionStorage.getItem('auth')
    setUser(userAuth)

  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        {
          user &&
          <Route path='/' element={
            <UserContext.Provider value={user}>
              <Layout />
            </UserContext.Provider>
          }>
            <Route path='/user' element={<User />} />
            <Route path='/analytics' element={<Analytics />} />
          </Route>
        }
      </Routes>
    </div>
  );
}

export default App;
