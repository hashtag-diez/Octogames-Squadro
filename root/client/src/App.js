import './style/App.css'
import {BrowserRouter as Router,Routes,Link,Route} from "react-router-dom";
import Plateau from './components/Plateau'
import Home from "./components/Home"
import AboutUs from "./pages/AboutUs"
import BotGame from './pages/BotGame'
import LocalGame from './pages/LocalGame'

function App () {
    //let history=useNavigate();

  return (
      <>
          <Router>
              <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route exact path="/sologame" element={<BotGame Authorized={true}/>}></Route>
                  <Route exact path="/local_multiplayerGame" element={<LocalGame Authorized={true}/>}></Route>
{/*                   <Route exact path="/multiplayerGame" element={<Waiting/>}></Route>
 */}                  <Route exact path="/AboutUs" element={<AboutUs/>}></Route>
                  <Route exact path="*" element={<Home/>}></Route>
              </Routes>
          </Router>

        </>
  );
}
export default App
