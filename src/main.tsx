import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductCategoryPage from './pages/Products.tsx'
import ProductDetailPage from './components/productDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
     <BrowserRouter> 
        <Routes>    
            <Route path="/" element={<App />} />
           <Route path="/rutina/:categorySlug" element={<ProductCategoryPage />} />
           <Route path="/producto/:id" element={<ProductDetailPage />} />

         
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
