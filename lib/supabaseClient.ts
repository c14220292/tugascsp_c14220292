import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Barang = {
    id: number;
    judul: string;
    deskripsi: string;
    harga: number;
    url_gambar: string;
    kategori: string;
    created_at?: string;
};
