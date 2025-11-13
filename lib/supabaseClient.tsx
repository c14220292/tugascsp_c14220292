import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const API_URL = 'https://fakestoreapi.com/products';

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

async function fetchAndInsertData() {
    try {
        const response = await axios.get(API_URL);
        const barang = response.data;

        for (const product of barang) {
            const { title, description, price, image, category } = product;

            const { data, error } = await supabase
                .from('barang')
                .select('id')
                .eq('judul', title)
                .maybeSingle();

            if (error) {
                console.error('Error checking data:', error);
                continue;
            }

            if (!data) {
                await supabase
                    .from('barang')
                    .upsert([
                        {
                            judul: title,
                            deskripsi: description,
                            harga: price,
                            url_gambar: image,
                            kategori: category,
                        },
                    ]);
                console.log(`Produk "${title}" berhasil ditambahkan.`);
            } else {
                console.log(`Produk "${title}" sudah ada, melewatkan insert.`);
            }
        }
        console.log('Proses pengecekan dan penambahan data selesai.');
    } catch (error) {
        console.error('Error fetching or inserting data:', error);
    }
}

fetchAndInsertData();