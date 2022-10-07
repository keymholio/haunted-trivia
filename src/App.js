import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Trivia from './components/Trivia';
import Subscribe from './components/Subscribe';
import logo from './images/cohlogo.png';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trivia/:id" element={<Trivia />} />
      <Route path="/subscribe" element={<Subscribe />} />
    </Routes>
  );
}

export default App;

function Home() {
  return (
    <>
      <header>
        <div class="logo">
          <img src={logo} width="150" alt="Chambers of Hell logo" />
        </div>
      </header>
      <main>
        <h1>Trivia</h1>
        <Link to="trivia/0" className="nav-link">
          Alice's Nightmare
        </Link>
      </main>
    </>
  );
}
