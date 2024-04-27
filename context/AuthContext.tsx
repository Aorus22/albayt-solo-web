'use client'
import React, { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from "firebase/auth";
import { auth, firestore } from "@/db/firebase";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    googleSignIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, googleSignIn: () => {}, logOut: () => {} });

export const AuthContextProvider = ({ children }: { children: ReactNode; }) => {
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await addUserData(user);

        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const logOut = () => {
        signOut(auth)
            .catch(error => console.error("Error signing out:", error));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

async function addUserData(user: User) {
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
        alert("Data added successfully!");
    } else {
        alert("User data already exists in Firestore!");
    }
}

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};


export async function addPurchase(dataPembelian: any) {
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
            tanggalPemesanan: dataPembelian.tanggalPemesanan
        });
        await addPurchaseToHistory(dataPembelian.UID, dataPembelian.purchaseID)
        alert("Data added successfully!");
    } else {
        alert("User data already exists in Firestore!");
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
