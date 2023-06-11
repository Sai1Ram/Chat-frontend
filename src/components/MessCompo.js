import React from 'react'

const MessCompo = ({left, right, message}) => {
  return (
    <>
    <div className="chat-message">
          <div className={`flex items-end ${!left && 'justify-end'}`}>
            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2  ${left ? 'items-start order-2' : 'items-end order-1'}`}>
              <div>
                <span className={`px-4 py-2 rounded-lg inline-block rounded-bl-none  ${left ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-white'}`}>
                {message}
                </span>
              </div>
            </div>
            <img
              src=""
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
    </>
  )
}

export default MessCompo