import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Syoukai from './pages/Syoukai.js'
import Touhyou from './pages/Touhyou.js'
import Arasuzi from './pages/Arasuzi.js'
import Kouryaku from './pages/Kouryaku.js'
import Kansou from './pages/Kansou.js'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Touhyou" element={<Touhyou />} />
        <Route path="/Syoukai" element={<Syoukai />} />
        <Route path="/Arasuzi" element={<Arasuzi />} />
        <Route path="/Kouryaku" element={<Kouryaku />} />
        <Route path="/Kansou" element={<Kansou />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
