import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import PolyView from './pages/PolyView';
import AllPolies from './pages/AllPolies';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/poly/:slug" exact element={<PolyView/>}/>
          <Route path="/allpolies" exact element={<AllPolies/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
