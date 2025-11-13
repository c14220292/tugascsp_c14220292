"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Barang } from "@/lib/supabaseClient";

type CartContextType = {
    cart: Barang[];
    addToCart: (item: Barang) => void;
    getCartCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Barang[]>([]);

    const addToCart = (item: Barang) => {
        setCart((prev) => [...prev, item]);
    };

    const getCartCount = () => cart.length;

    return (
        <CartContext.Provider value={{ cart, addToCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
