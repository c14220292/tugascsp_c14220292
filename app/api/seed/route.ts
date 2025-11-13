import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FAKESTORE_API_URL = 'https://fakestoreapi.com/products';

export async function POST() {
    try {
        const response = await fetch(FAKESTORE_API_URL);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch from FakeStore API' }, { status: 500 });
        }

        const products = await response.json();
        let insertedCount = 0;
        let skippedCount = 0;

        for (const product of products) {
            const { title, description, price, image, category } = product;

            const { data: existing } = await supabase
                .from('barang')
                .select('id')
                .eq('judul', title)
                .maybeSingle();

            if (!existing) {
                const { error } = await supabase
                    .from('barang')
                    .insert([{
                        judul: title,
                        deskripsi: description,
                        harga: price,
                        url_gambar: image,
                        kategori: category,
                    }]);

                if (error) {
                    console.error(`Error inserting ${title}:`, error);
                } else {
                    insertedCount++;
                }
            } else {
                skippedCount++;
            }
        }

        return NextResponse.json({
            message: 'Seed completed',
            inserted: insertedCount,
            skipped: skippedCount,
            total: products.length
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
