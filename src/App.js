import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SingleDog from "./pages/SingleDog"
import { DarkModeProvider } from './DarkModeContext';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Preloader from "./Preloader.json";

function App() {

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fakeDataFetch = () => {
      // Check if the window has already loaded
      if (document.readyState === 'complete') {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } else {
        // If the window is not loaded, wait for the load event
        window.addEventListener('load', () => {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        });
      }
    };

    fakeDataFetch();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('load', fakeDataFetch);
    };
  }, []);

  return isLoading ? (
    
    <div className=" h-[100vh] bg-white">
    <Lottie
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-auto"
      animationData={Preloader}
  />
</div>
  ) : (
    <>
    <AnimatePresence mode="wait">

    <DarkModeProvider>
      <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
        <Routes>
          <Route key="home" path="/" element={<Home />} />
          <Route key="singleDog" path="/:name/:id" element={<SingleDog />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  
      </AnimatePresence>
    </>
  );
}

export default App;
