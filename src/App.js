import React from 'react';
import {Routes, Route} from "react-router-dom";
import ChatPage from "./components/ChatPage";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Toast from './components/Toast';
import LoadingBtn from './components/LoadingBtn';
function App() {
  return (
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/toast' element={<Toast/>}/>
      <Route path='/loadingBtn' element={<LoadingBtn/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/chats' element={<ChatPage/>}/>
    </Routes>
  )
}

export default App
