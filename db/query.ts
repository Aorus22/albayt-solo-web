import {DataPembelian} from "@/app/paket/[title]/paymentpage/page";
import {collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
import {firestore} from "@/db/firebase";
import {PackageProps} from "@/Components/Card_Paket";
import {PurchaseDetail} from "@/app/detailTransaksi/[purchaseID]/page";

export async function addPurchase(dataPembelian: DataPembelian) {
    const userRef = doc(firestore, "pembelian", dataPembelian.purchaseID);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        await setDoc(userRef, {
            purchaseID: dataPembelian.purchaseID || "",
            paketID: dataPembelian.paketID || "",
            UserID: dataPembelian.UID || "",
            email : dataPembelian.email|| "",
            detailJamaah : dataPembelian.detailJamaah|| "",
            metodePembayaran: dataPembelian.metodePembayaran,
            statusPembayaran: "Belum Dibayar",
            totalPembayaran: dataPembelian.totalPembayaran,
            tanggalPemesanan: dataPembelian.tanggalPemesanan,
            urlBuktiPembayaran: dataPembelian.urlBuktiPembayaran
        });
        await addPurchaseToHistory(dataPembelian.UID || "", dataPembelian.purchaseID)
        const jumlahJamaah = dataPembelian.detailJamaah.anak.length + dataPembelian.detailJamaah.dewasa.length
        await ubahSisaSeat(dataPembelian.paketID, jumlahJamaah)
    }
}

const addPurchaseToHistory = async (userID: string, purchaseID:string) => {
    const userRef = doc(firestore, "users", userID);

    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const existingHistory = userDoc.data()["riwayat-pembelian"] || [];

            const updatedHistory = [...existingHistory, purchaseID];

            await updateDoc(userRef, {
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
    const userRef = doc(firestore, "pembelian", purchaseID);
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            await updateDoc(userRef, {
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
    const userRef = doc(firestore, "paket", paketID);
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const currentSeat = userDoc.data().remainingseat || 0;
            if (currentSeat > 0) {
                await updateDoc(userRef, {
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

    return paketArray as PackageProps[];
};

export const ambilPaket = async (paketID: string) => {
    const userRef = doc(firestore, "paket", paketID);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
        return null
    }
    return userDoc.data() as PackageProps
}

export const ambilDetailPurchase = async(purchaseID: string) => {
    const userRef = doc(firestore, "pembelian", purchaseID);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
        return null
    }
    const purchaseData = userDoc.data()
    const paketID = purchaseData ? purchaseData["paketID"] : ""
    const paketDoc = await ambilPaket(paketID)

    return {
        detailPembelian: purchaseData as PurchaseDetail,
        detailPaket: paketDoc
    }
}

export const ambilRiwayatPembelian = async (userID: string) => {
    const userRef = doc(firestore, "users", userID);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
        return null
    }
    const userData = userDoc.data()
    const riwayatPembelian = userData ? userData['riwayat-pembelian'] || [] : [];
    const purchaseDetails = []
    for (const purchaseID of riwayatPembelian) {
        const data = await ambilDetailPurchase(purchaseID)
        if (data !== null){
            purchaseDetails.push(data)
        }
    }
    return purchaseDetails
}