import { Link, Routes, Route } from 'react-router-dom';
import AdminProductPage from './admin/adminProductPage';

export default function AdminPage() {
  return (
    <div className="flex h-screen">
      <div className="w-[300px] bg-gray-200 p-4 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-6">Welcome to the admin panel.</p>
        <Link to="/admin/products" className="text-blue-500 block mb-2 hover:underline">Products</Link>
        <Link to="/admin/orders" className="text-blue-500 block mb-2 hover:underline">Orders</Link> 
        <Link to="/admin/users" className="text-blue-500 block mb-2 hover:underline">Users</Link>
        <Link to="/admin/reviews" className="text-blue-500 block mb-2 hover:underline">Reviews</Link>
      </div>
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminProductPage />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="orders" element={<h1 className="text-3xl font-bold m-6">Orders Management</h1>} />
          <Route path="users" element={<h1 className="text-3xl font-bold m-6">Users Management</h1>} />
          <Route path="reviews" element={<h1 className="text-3xl font-bold m-6">Reviews Management</h1>} />
        </Routes>
      </div>
    </div>
  )
}