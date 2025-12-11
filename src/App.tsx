import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound/NotFound'
import { Header } from './layouts'
import { BreadcrumbProvider, useBreadcrumbContext, useCart } from './context'
import { Toast } from './ui'
import './App.css'

function AppContent() {
  const { items: breadcrumbItems } = useBreadcrumbContext()
  const { expiredCount, clearExpiredNotification } = useCart()

  return (
    <>
      <Header
        logo={<span className="header-logo-text">MobileStore</span>}
        sticky
        breadcrumbItems={breadcrumbItems}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {expiredCount > 0 && (
        <Toast 
          message={`Se ${expiredCount === 1 ? 'ha eliminado 1 producto' : `han eliminado ${expiredCount} productos`} del carrito por expiración`}
          onDismiss={clearExpiredNotification}
          type="warning"
        />
      )}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <BreadcrumbProvider>
        <AppContent />
      </BreadcrumbProvider>
    </BrowserRouter>
  )
}

export default App
