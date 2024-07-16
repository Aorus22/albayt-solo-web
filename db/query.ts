'use server'
import {collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
import {firestore} from "@/db/firebase";
import { User } from "firebase/auth";
import { Paket, DetailPembelian } from "@/utils/type";

export async function getUser(UID: string) {
    if (!UID?.length) return;
    const userRef = doc(firestore, "users", UID);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data()
    return JSON.parse(JSON.stringify(userData))
}

export async function addUserData(user: User) {
    const userRef = doc(firestore, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        await setDoc(userRef, {
            name: user.displayName || "",
            email: user.email || "",
            photo: user.photoURL || "",
            telp : user.phoneNumber || "",
            address : "",
            desc : ""
        });
    } 
}

export async function addPurchase(dataPembelian: DetailPembelian) {
    const purchaseRef = doc(firestore, "pembelian", dataPembelian.purchaseID);
    const purchaseSnapshot = await getDoc(purchaseRef);

    if (!purchaseSnapshot.exists()) {
        await setDoc(purchaseRef, {
            purchaseID: dataPembelian.purchaseID,
            paketID: dataPembelian.paketID,
            UserID: dataPembelian.UserID,
            email : dataPembelian.email,
            detailJamaah : dataPembelian.detailJamaah,
            metodePembayaran: dataPembelian.metodePembayaran,
            statusPembayaran: "Belum Dibayar",
            totalPembayaran: dataPembelian.totalPembayaran,
            tanggalPemesanan: dataPembelian.tanggalPemesanan,
            urlBuktiPembayaran: dataPembelian.urlBuktiPembayaran
        });
        await addPurchaseToHistory(dataPembelian.UserID || "", dataPembelian.purchaseID)
        const jumlahJamaah = (dataPembelian.detailJamaah.anak || []).length + dataPembelian.detailJamaah.dewasa.length
        await ubahSisaSeat(dataPembelian.paketID, jumlahJamaah)
    }
}

const addPurchaseToHistory = async (userID: string, purchaseID:string) => {
    const purchaseRef = doc(firestore, "users", userID);

    try {
        const purchaseDoc = await getDoc(purchaseRef);
        if (purchaseDoc.exists()) {
            const existingHistory = purchaseDoc.data()["riwayat-pembelian"] || [];

            const updatedHistory = [...existingHistory, purchaseID];

            await updateDoc(purchaseRef, {
                "riwayat-pembelian": updatedHistory
            });

            console.log("Riwayat pembelian berhasil diperbarui untuk user dengan ID:", userID);
        } else {
            console.error("User dengan ID yang diberikan tidak ditemukan");
        }
    } catch (error) {
        console.error("Error updating user purchase history:", error);
    }
};

export const addBuktiPembelian = async (purchaseID:string, urlBuktiPembayaran:string) => {
    const purchaseRef = doc(firestore, "pembelian", purchaseID);
    try {
        const purchaseDoc = await getDoc(purchaseRef);
        if (purchaseDoc.exists()) {
            await updateDoc(purchaseRef, {
                "statusPembayaran": "Menunggu Konfirmasi",
                "urlBuktiPembayaran": urlBuktiPembayaran
            });
        } else {
            console.error("Pembelian dengan ID yang diberikan tidak ditemukan");
        }
    } catch (error) {
        console.error("Error updating pruchase status:", error);
    }
};

export const ubahSisaSeat = async (paketID: string, jumlahPesanSeat: number) => {
    const paketRef = doc(firestore, "paket", paketID);
    try {
        const paketDoc = await getDoc(paketRef);
        if (paketDoc.exists()) {
            const currentSeat = paketDoc.data().remainingseat || 0;
            if (currentSeat > 0) {
                await updateDoc(paketRef, {
                    remainingseat: currentSeat - jumlahPesanSeat,
                });
                console.log("Sisa kursi berhasil diperbarui.");
            } else {
                console.error("Sisa kursi sudah habis.");
            }
        } else {
            console.error("Paket dengan ID yang diberikan tidak ditemukan");
        }
    } catch (error) {
        console.error("Error updating purchase status:", error);
    }
};

export const ambilSemuaPaket = async () => {
    const q = query(collection(firestore, 'paket'), where('remainingseat', '>', 0));

    const querySnapshot = await getDocs(q);
    const paketArray: any[] = [];

    querySnapshot.forEach((doc) => {
        paketArray.push(doc.data());
    });

    return JSON.parse(JSON.stringify(paketArray)) as Paket[];
};

export const ambilPaket = async (paketID: string) => {
    const paketRef = doc(firestore, "paket", paketID);
    const paketDoc = await getDoc(paketRef);
    if (!paketDoc.exists()) {
        return null
    }
    return JSON.parse(JSON.stringify(paketDoc.data())) as Paket
}

export const ambilDetailPembayaran = async(purchaseID: string) => {
    const purchaseRef = doc(firestore, "pembelian", purchaseID);
    const purchaseDoc = await getDoc(purchaseRef);
    if (!purchaseDoc.exists()) {
        return null
    }
    const purchaseData = purchaseDoc.data()
    const paketID = purchaseData ? purchaseData["paketID"] : ""
    const paketDoc = await ambilPaket(paketID)

    return {
        detailPembelian: purchaseData as DetailPembelian,
        detailPaket: paketDoc
    }
}

export const ambilRiwayatPembelian = async (userID: string) => {
    const purchaseRef = doc(firestore, "users", userID);
    const purchaseDoc = await getDoc(purchaseRef);
    if (!purchaseDoc.exists()) {
        return []
    }
    const userData = purchaseDoc.data()
    const riwayatPembelian = userData ? userData['riwayat-pembelian'] || [] : [];
    const purchaseDetails = []
    for (const purchaseID of riwayatPembelian) {
        const data = await ambilDetailPembayaran(purchaseID)
        if (data !== null){
            purchaseDetails.push(data)
        }
    }
    return JSON.parse(JSON.stringify(purchaseDetails.reverse()))
}