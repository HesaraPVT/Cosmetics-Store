import { Link, Routes, Route } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div className="flex">
      <div className="w-[300px] bg-gray-200 p-4">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin panel.</p>
        <Link to="/admin/products" className="text-blue-500 block mb-2">Products</Link>
        <Link to="/admin/orders" className="text-blue-500 block mb-2">Orders</Link> 
        <Link to="/admin/users" className="text-blue-500 block mb-2">Users</Link>
        <Link to="/admin/reviews" className="text-blue-500 block mb-2">Reviews</Link>
      </div>
      <div className="h-full w-[calc(100%-300px)] bg-amber-400">
        <Routes path="/*">
          <Route path="products" element={<h1 className="text-3xl font-bold mb-4">Products Management</h1>} />
          <Route path="orders" element={<h1 className="text-3xl font-bold mb-4">Orders Management</h1>} />
          <Route path="users" element={<h1 className="text-3xl font-bold mb-4">Users Management</h1>} />
          <Route path="reviews" element={<h1 className="text-3xl font-bold mb-4">Reviews Management</h1>} />
        </Routes>
      </div>
    </div>
  )
}