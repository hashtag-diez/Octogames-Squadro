import './style/App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import MultiplayerGame from "./pages/MultiplayerGame"
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
                  <Route path="/bot" element={<LocalGame isAgainstBot={true} />} />
                  <Route path="/local" element={<LocalGame isAgainstBot={false} />} />
                  <Route exact path="/network" element={<MultiplayerGame/>}></Route>
                   <Route exact path="/AboutUs" element={<AboutUs/>}></Route>
                  <Route exact path="*" element={<Home/>}></Route>
              </Routes>
          </Router>
        </>
  );
}
export default App