import './style/App.css'
import {BrowserRouter as Router,Routes,Link,Route} from "react-router-dom";
import Plateau from './components/Plateau'
import Home from "./components/Home"
import MultiplayersPopUp from "./components/MultiplayersPopUp"
import Waiting from "./components/Waiting"
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
                  <Route exact path="/sologame" element={<Plateau Authorized={false}/>}></Route>
                  <Route exact path="/local_multiplayerGame" component={<Plateau Authorized={false}/>}></Route>
                  <Route exact path="/multiplayerGame" component={<Waiting/>}></Route>
                  <Route exact path="*" element={<Home/>}></Route>
              </Routes>
          </div>
              <img id="octogames" src={octogames} alt="octogames"/>
          </Router>

        </>
  );
}

export default App
