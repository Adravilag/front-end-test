import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { Header } from './layouts'
import './App.css'

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Smartphones', href: '/smartphones' },
  { label: 'Tablets', href: '/tablets' },
  { label: 'Accesorios', href: '/accesorios' },
  { label: 'Ofertas', href: '/ofertas' },
]

function App() {
  return (
    <BrowserRouter>
      <Header
        logo="MobileStore"
        navItems={navItems}
        showSearch
        sticky
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
