import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoHome from './ToDoHome'


function App() {
  const [count, setCount] = useState(0)

  return (
      <div className=" min-h-screen h-screen flex justify-center items-center bg-[url('https://i.pinimg.com/736x/01/4b/83/014b83d7ea535aedd032ef46131456ea.jpg')] bg-no-repeat bg-contain  bg-right ">
        <ToDoHome></ToDoHome>
      </div>

  )
}

export default App
