import { useState } from 'react'
import Home from './views/Home/Home'
import { createContext } from 'react'
import { GlobalContext } from './context/GlobalContext'

function App() {

  const text = "Test"

  return (
    <>
      <GlobalContext.Provider >
        <Home></Home>
      </GlobalContext.Provider>

    </>
  )
}

export default App
