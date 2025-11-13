"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase, Barang } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
    const params = useParams();
    const [product, setProduct] = useState<Barang | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await supabase
                .from("barang")
                .select("*")
                .eq("id", params.id)
                .maybeSingle();

            if (error) {
                console.error("Error fetching product:", error);
            } else {
                setProduct(data);
            }
            setLoading(false);
        }

        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading product...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Product not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-4xl mx-auto px-8 py-12">
                <Link href="/" className="text-teal-600 hover:text-teal-700 mb-6 inline-block">
                    ← Back to Products
                </Link>
                <h1 className="text-4xl font-semibold text-center mb-12 text-gray-900">
                    {product.judul}
                </h1>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative h-96 bg-gray-100">
                        <Image
                            src={product.url_gambar}
                            alt={product.judul}
                            fill
                            className="object-contain p-8"
                        />
                    </div>
                    <div className="p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">{product.judul}</h2>
                            <p className="text-gray-600 leading-relaxed">{product.deskripsi}</p>
                        </div>
                        <div className="mb-4">
                            <span className="text-sm font-medium text-gray-500">Category:</span>
                            <span className="ml-2 text-gray-900 capitalize">{product.kategori}</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                            ${product.harga}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
