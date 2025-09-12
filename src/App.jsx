import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register"; // Sarah perlu bikin file ini

import { UserProvider } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";

import Navbar from "./components/Navbar";

function App() {
  return (
    <UserProvider>
      <IdeasProvider>
        <Router>
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </Router>
      </IdeasProvider>
    </UserProvider>
  );
}

export default App;
