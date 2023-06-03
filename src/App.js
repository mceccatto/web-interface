import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import ConfigRoutes from './ConfigRoutes';

function App() {
  return (
    <div className='container'>
      <Router>
        <Header />
        <ConfigRoutes />
      </Router>
    </div>
  );
}

export default App;