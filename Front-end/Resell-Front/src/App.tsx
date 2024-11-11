import Sneakers from './components/Sneakers.tsx';
import DiscordBot from './components/Discord.tsx';
import NotFound from './components/NotFoundPage.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Inventario' element={<Sneakers />} />
        <Route path='/Discord' element={<DiscordBot />} />  
        <Route path='/' element={<Navigate to="/Inventario" />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
