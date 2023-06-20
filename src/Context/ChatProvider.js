import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const ChatContext = createContext();
function ChatProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem("userInfo"));
        if(!userData){
            navigate("/signIn");
        }
    },[navigate])
    
  return(
  <ChatContext.Provider value={{user, setUser}}>
    {children}
  </ChatContext.Provider>)

}


export default ChatProvider