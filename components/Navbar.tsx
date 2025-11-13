"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <nav className="bg-teal-500 text-white py-4 px-8">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="text-xl">🏪</div>
                    <h1 className="text-xl font-semibold">Beauty and Luxury's Products</h1>
                </div>
                <div className="flex gap-6 text-base">
                    <Link href="/" className="hover:text-teal-100 transition-colors">
                        Home
                    </Link>
                    <Link href="/cart" className="hover:text-teal-100 transition-colors">
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
