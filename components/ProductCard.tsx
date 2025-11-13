"use client";

import { Barang } from "@/lib/supabaseClient";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
    product: Barang;
};

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-64 bg-gray-100">
                <Image
                    src={product.url_gambar}
                    alt={product.judul}
                    fill
                    className="object-contain p-4"
                />
            </div>
            <div className="p-4">
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-medium text-gray-900 hover:text-teal-600 transition-colors cursor-pointer line-clamp-2 min-h-14">
                        {product.judul}
                    </h3>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-semibold text-gray-900">
                        ${product.harga}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-600 transition-colors"
                    >
                        add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}
