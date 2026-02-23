import { useEffect, useState } from 'react';
import axios from 'axios';
import { sampleProducts } from '../../assets/sampleData';

export default function AdminProductPage() {

    const [products, setProducts] = useState(sampleProducts[0] || []);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + '/api/products/')
            .then(response => {
                console.log('Products fetched successfully:', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);
    return (
        <div className="w-full p-6">
            <h2 className="text-3xl font-bold mb-6">Products Management</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 border-b">
                            <th className="px-4 py-2 text-left font-bold">Product ID</th>
                            <th className="px-4 py-2 text-left font-bold">Name</th>
                            <th className="px-4 py-2 text-left font-bold">Image</th>
                            <th className="px-4 py-2 text-left font-bold">Labelled Price</th>
                            <th className="px-4 py-2 text-left font-bold">Price</th>
                            <th className="px-4 py-2 text-left font-bold">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && Array.isArray(products) && products.length > 0 ? (
                                products.map(
                                    (item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="px-4 py-2">{item.productId}</td>
                                                <td className="px-4 py-2">{item.name}</td>
                                                <td className="px-4 py-2"><img src={item.images[0]} className="w-[50px] h-[50px]" alt={item.name} /></td>
                                                <td className="px-4 py-2">${item.labeledPrice}</td>
                                                <td className="px-4 py-2">${item.price}</td>
                                                <td className="px-4 py-2">{item.stock}</td>
                                            </tr>
                                        )
                                    }
                                )
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">No products found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}