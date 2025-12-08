import {  useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import LandingPage from "./components/LandingPage/LandingPage.jsx";


function App() {
  const userAuth = useSelector((state) => state.auth);
  const monitorData = useSelector((state) => state.monitor);


  useEffect(() => {
      console.log("App Component - User Auth State ==> ");  
  console.log(userAuth);

  console.log("App Component - Monitor Data State ==> ");  
  console.log(monitorData);
 
  }, [userAuth, monitorData]);



  return <LandingPage />;
}

export default App;
