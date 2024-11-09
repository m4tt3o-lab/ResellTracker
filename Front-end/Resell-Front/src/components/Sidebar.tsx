import 'bootstrap-icons/font/bootstrap-icons.css'; 
import '../Navbar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); 

  return (
    <div className="sidebar">
      <nav>
        <button 
          className="nav-button" 
          title="Inventario" 
          onClick={() => navigate('/Inventario')}
        >
          <i className="bi bi-box-seam"></i>
        </button>
        <button 
          className="nav-button" 
          title="Sconti" 
          onClick={() => navigate('/Sconti')}
        >
          <i className="bi bi-percent"></i>
        </button>
        <button 
          className="nav-button" 
          title="Discord-WTB" 
          onClick={() => navigate('/Discord')}
        >
          <i className="bi bi-discord"></i>
        </button>
        <button 
          className="nav-button" 
          title="Report" 
          onClick={() => navigate('/Report')}
        >
          <i className="bi bi-bar-chart"></i>
        </button>
        <button 
          className="nav-button" 
          title="Impostazioni" 
          onClick={() => navigate('/Impostazioni')}
        >
          <i className="bi bi-gear"></i>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
