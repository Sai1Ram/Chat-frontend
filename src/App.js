import React from 'react';
import {Routes, Route} from "react-router-dom";
// import ChatPage from "./components/ChatPage";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Toast from './components/miscellaneous/Toast';
import ChatPage2 from './components/ChatPage';
function App() {
  return (
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/toast' element={<Toast/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/chats' element={<ChatPage2/>}/>
    </Routes>
  )
}

export default App
