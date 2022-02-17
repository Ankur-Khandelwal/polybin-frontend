import PolyLogo from '../assets/pnlogo1.png';
import './components.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <a href='/'><img src={PolyLogo} alt="Polylogo" className="navbar-logo" /></a>
      <h1 className="polybin">Polybin</h1>
    </div>
  );
};

export default Navbar;
