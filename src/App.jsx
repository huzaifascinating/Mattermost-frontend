import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketList from './components/ticketList';
import TicketForm from './components/ticketForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketList />} />
        <Route path="/create" element={<TicketForm />} />
        <Route path="/create/:id" element={<TicketForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
