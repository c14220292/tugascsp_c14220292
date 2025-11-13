"use client";

import { useEffect, useState } from "react";
import { Barang } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/barang");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error fetching products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-semibold text-center mb-12 text-gray-900">
          Beauty and Luxury&apos;s Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
