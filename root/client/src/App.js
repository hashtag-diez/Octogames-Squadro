import './style/App.css'
import {BrowserRouter as Router,Routes,Link,Route} from "react-router-dom";
import Plateau from './components/Plateau'
import Home from "./components/Home"
import Waiting from "./components/Waiting"
import AboutUs from "./components/AboutUs"

function App () {
    //let history=useNavigate();

  return (
      <>
          <Router>
              <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route exact path="/sologame" element={<Plateau Authorized={true}/>}></Route>
                  <Route exact path="/local_multiplayerGame" element={<Plateau Authorized={true}/>}></Route>
                  <Route exact path="/multiplayerGame" element={<Waiting/>}></Route>
                  <Route exact path="/AboutUs" element={<AboutUs/>}></Route>
                  <Route exact path="*" element={<Home/>}></Route>
              </Routes>
          </Router>

        </>
  );
}
export default App
