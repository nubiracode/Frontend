import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductCategoryPage from './pages/Products.tsx'
import ProductDetailPage from './pages/productDetail.tsx'
import KBeautyRoutine from './pages/DailyRoutine.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
     <BrowserRouter> 
        <Routes>    
           <Route path="/" element={<App />} />
           <Route path="/yourRoutine" element={<KBeautyRoutine/>} />
           <Route path="/:categorySlug" element={<ProductCategoryPage />} />
           <Route path="/:categorySlug/:id" element={<ProductDetailPage />} />

         
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
