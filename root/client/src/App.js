import './style/App.css'
<<<<<<< HEAD
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import BotGame from './pages/BotGame'
import LocalGame from './pages/LocalGame'

=======
import Plateau from './components/Plateau'
>>>>>>> 27f10b3 (Add files/codes to implement a brainless static version of the board)
function App () {
    //let history=useNavigate();

  return (
      <>
          <Router>
              <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route exact path="/sologame" element={<BotGame Authorized={true}/>}></Route>
                  <Route path="/local_multiplayerGame" element={<LocalGame isAgainstBot={false} />} />
{/*                   <Route exact path="/multiplayerGame" element={<Waiting/>}></Route>
 */}                  <Route exact path="/AboutUs" element={<AboutUs/>}></Route>
                  <Route exact path="*" element={<Home/>}></Route>
              </Routes>
          </Router>

        </>
  );
}
export default App