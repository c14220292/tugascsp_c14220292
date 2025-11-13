"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function Cart() {
    const { cart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="max-w-7xl mx-auto px-8 py-12">
                    <h1 className="text-4xl font-semibold text-center mb-12 text-gray-900">
                        Cart Page
                    </h1>
                    <div className="text-center text-gray-600 text-xl">
                        Your cart is empty
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-8 py-12">
                <h1 className="text-4xl font-semibold text-center mb-12 text-gray-900">
                    Cart Page
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cart.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <div className="relative h-64 bg-gray-100">
                                <Image
                                    src={product.url_gambar}
                                    alt={product.judul}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 line-clamp-2 min-h-14">
                                    {product.judul}
                                </h3>
                                <div className="mt-3">
                                    <span className="text-xl font-semibold text-gray-900">
                                        ${product.harga}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
