import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'
import { Header } from './layouts'
import './App.css'

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Smartphones', href: '/?category=smartphones' },
  { label: 'Tablets', href: '/?category=tablets' },
  { label: 'Accesorios', href: '/?category=accesorios' },
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
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
