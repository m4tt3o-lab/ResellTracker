import 'bootstrap-icons/font/bootstrap-icons.css'; 
import '../Navbar.css';


const Sidebar = () => {
    return (
      <div className="sidebar">
        <nav>
          <button className="nav-button" title="Home">
          <i className="bi bi-discord"></i>
          </button>
          <button className="nav-button" title="Aggiungi Sneakers">
          <i className="bi bi-percent"></i>
          </button>
          <button className="nav-button" title="Inventario">
            <i className="bi bi-box-seam"></i>
          </button>
          <button className="nav-button" title="Report">
            <i className="bi bi-bar-chart"></i>
          </button>
          <button className="nav-button" title="Impostazioni">
            <i className="bi bi-gear"></i>
          </button>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;