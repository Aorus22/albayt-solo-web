import { Timestamp } from "firebase/firestore";

export type Harga = {
    tipe:string,
    nominal:number,
    currency:string
}

export type Hotel = {
    bintang:string,
    nama_hotel:string,
    url_hotel:string[],
}

export type Paket = {
    paketID: string;
    img: string;
    harga: Harga[]
    title: string;
    jadwal: Timestamp;
    durasi: string;
    hotel: Hotel[];
    totalseat: number;
    remainingseat: number;
    lokasiberangkat: string;
    harga_dp: number;
    maskapai: string;
    thumbnail: string;
}
  
export type Testimoni = {
    id: string,
    img: string,
    nama: string,
    bintang: number,
    review: string
}

export type Anak = {
    nama: string;
    tgl_lahir: string;
}
  
export type Dewasa = {
    nama: string;
    telp: string;
}

export type DetailPembelian = {
    UserID: string;
    purchaseID: string;
    paketID: string;
    totalPembayaran: number;
    statusPembayaran?: string;
    metodePembayaran: string;
    tanggalPemesanan: Timestamp;
    email: string;
    detailJamaah: {
      dewasa: Dewasa[];
      anak?: Anak[];
    };
    urlBuktiPembayaran: string
}

export type DataPembelian = {
  detailPembelian: DetailPembelian;
  detailPaket: Paket;
}