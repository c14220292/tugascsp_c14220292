import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('barang')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { judul, deskripsi, harga, url_gambar, kategori } = body;

        if (!judul || !deskripsi || !harga || !url_gambar || !kategori) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('barang')
            .insert([{ judul, deskripsi, harga, url_gambar, kategori }])
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
