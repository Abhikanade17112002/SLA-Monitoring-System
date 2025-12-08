import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux';
import LandingPage from './components/LandingPage/LandingPage.jsx';

function App() {
  const [count, setCount] = useState(0) ;

  const { user , token , isLoading} = useSelector((state) => state.auth) ;

  console.log("User ==> " + user );
  console.log("Token ==> " + token );
  console.log("Is Loading ==> " + isLoading );
  

  return (
      <LandingPage />
  )
}

export default App
