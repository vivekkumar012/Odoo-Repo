import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const demoListings = [
  {
    _id: "demo1",
    title: "Blue Denim Jacket",
    description: "Classic blue denim jacket in great condition.",
    category: "Clothing",
    type: "Jacket",
    size: "M",
    condition: "Like New",
    image: "https://imgs.search.brave.com/11GrgXUOTqOBIWEmBvVhBDR_D15WM0vVmZ5k-XWyXNE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2VlL2Yz/L2NkL2VlZjNjZDI0/MjJjMDk0NDBlNDUx/MjUwYWJiOTZhYzNh/LmpwZw"
  },
  {
    _id: "demo2",
    title: "Summer Floral Dress",
    description: "Light and breezy floral dress perfect for summer outings.",
    category: "Clothing",
    type: "Dress",
    size: "S",
    condition: "Good",
    image: "https://imgs.search.brave.com/FoQODwa5lFNI2mu1VzcumX684lS2vxMbHP7SCemMIDQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzQ5NjYzODI1L3Iv/aWwvNTM5ZTAxLzU5/OTc0MjU5ODcvaWxf/NjAweDYwMC41OTk3/NDI1OTg3X3Rubnku/anBn"
  },
  {
    _id: "demo3",
    title: "Black T-shirt",
    description: "Simple cotton black T-shirt, worn only a few times.",
    category: "Clothing",
    type: "T-shirt",
    size: "L",
    condition: "Very Good",
    image: "https://imgs.search.brave.com/mgRaBLdBuqV3Fe-C2aH61lqvd-GD1v0MjI9oosIO3fA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzkv/Mzg0LzgzMS9zbWFs/bC9haS1nZW5lcmF0/ZWQtYmxhY2stdC1z/aGlydC1vbi1hLWhh/bmdlci1waG90by5q/cGc"
  }
];

export default function Listings() {
  const [products, setProducts] = useState(demoListings); // initially load demo

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch(() => {
        // If API fails, demoListings stay as fallback
        console.warn("API unavailable, using demo listings");
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product._id} className="bg-white shadow-md rounded-2xl p-4 transition hover:shadow-xl">
            {product.image && (
              <img
                src={product.image.startsWith("http") ? product.image : `/uploads/${product.image}`}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
              <span>Category: {product.category}</span>
              <span>Type: {product.type}</span>
              <span>Size: {product.size}</span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-green-600 font-medium">{product.condition}</span>
              <Link
                to={`/products/${product._id}`}
                className="text-blue-500 hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
