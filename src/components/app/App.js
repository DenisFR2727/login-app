import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../login/Login';
import UsersList from '../table/usersList';

import "./app.scss";

function App() {
  return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/table" element={<UsersList />} />
            </Routes>
          </div>
      </BrowserRouter>
  
  );
}
export default App;
