import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx"
import { Toaster } from "react-hot-toast";
import {useEffect} from "react"
import { useDispatch } from "react-redux";
import { setAuthUser } from "./redux/userSlice.js";
import {setallDoubts, setdoubtTree} from "./redux/doubtSlice.js"
import {setResearchPapers, setRelatedSearches} from "./redux/researchSlice.js"
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      
      dispatch(setAuthUser(null));
      dispatch(setallDoubts([]));
      dispatch(setdoubtTree([]));
      dispatch(setResearchPapers([]));
      dispatch(setRelatedSearches([]));
    }
  }, [dispatch])

  return (
    <div >
      <Header/>
      <Toaster/>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
