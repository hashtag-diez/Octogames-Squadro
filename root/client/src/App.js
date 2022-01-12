import './style/App.css'
import Plateau from './components/Plateau'
import {BrowserRouter as Router,Routes,Link,Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Home from "./components/Home"
import WelcomeScreen from "./components/Welcome Screen"
import squadro from "./assets/squadro.png";
import octogames from "./assets/Octogame.png";
import homeLogo from "./assets/home.jpg";

function App () {
    //let history=useNavigate();

  return (
      <>
          <Router>
          <div id="head">
              <Link to="/" ><button type="button" id="HomeButton"><img src={homeLogo} alt="Go Home"/></button></Link>
              <img id="squadro" src={squadro} alt="squadro"/>

          </div>
          <div id="content">
              <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route exact path="/sologame" element={<Plateau/>}></Route>
                  <Route exact path="/local_multiplayerGame" element={<Plateau/>}></Route>
                  <Route exact path="/multiplayerGame" element={<Plateau/>}></Route>

              </Routes>

          </div>


              <img id="octogames" src={octogames} alt="octogames"/>
          </Router>

</>
  );
}

export default App
