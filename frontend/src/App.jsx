import './App.css'
import Header from './components/header.jsx'
import ProductCard from './components/productCard.jsx'
import HomePage from './pages/home.jsx'
import LoginPage from './pages/login.jsx'
import SignUpPage from './pages/signup.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/adminPage.jsx';

function App() {

  return ( // /admin/* allows not only admin but also its sub routes like /admin/products, /admin/orders, etc. to be accessed by the AdminPage component. This is useful for creating a nested routing structure where the AdminPage component can serve as a layout or dashboard for various admin-related pages.
    <BrowserRouter>
    <div>
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/admin/*" element={<AdminPage />} /> 
      <Route path="/*" element={<h1 className="text-3xl font-bold mb-4">404 Not Found</h1>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
