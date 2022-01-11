import './style/App.css'
import Plateau from './components/Plateau'
import { Icone } from './components/Icone'

function App () {
  return (
    <div className='App'>
      <Plateau />
      <Icone editor />
      <Icone editor={false} name='Diez' theme='adventurer-neutral' />
    </div>
  )
}
export default App
