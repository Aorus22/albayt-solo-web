import "server-only";

import {cert, getApps, initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {PurchaseDetail} from "@/app/detailTransaksi/[purchaseID]/page";

export const firebaseApp =
  getApps().find((it) => it.name === "firebase-admin-app") ||
  initializeApp(
    {
      credential: cert(
          {
              projectId: "albayt-solo-web-50c59",
              privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJ510menZzFPi7\ncONNRuLmoakB/CoPaYt7pfsOR64rJfP2PPv5BGJw6XEMPMposamVzbAnC8BC0oBy\nNsjOMZ8sMsQMwSp0uiYKYS4oDcINovFXl45+o5WTof4HJzsDL9mjEOQNz6s881mV\nZhcTa9bJLNOGVzlE55xEL/LP992iS1yvRnj4jXBf0r6ch1+/g4AAHvIU0p+32KzF\n3WvpNqObS7EP7ZkPuIVErTSf8fiQK6kYgkH15J4KSmjfn9CkJTfzKm095dleaAmc\nwDdT1yElOjB/V3+QONM5idXGnK0lxxFgy9gCLwzFTfo+wnIN95JJCFOFrE7ti0h8\nZmrzva8DAgMBAAECggEAWt8jiTR4CF7Jfk+WNksvx36+GvMcGRi3Wxz+zFQNu0TX\nMx4KiG7lQY2HwGrB7PH9cjuDy2caDtlAT2eB5G/oBJQKsfTkv2miwmwvwn5CtzF9\nrx861puYsDwqIZ0SDeKk8SQiiGbN2t5qFPhAbZDNOHlQ8LdkQrN9nSD5h4m3Opok\n/aH+0Lhmtgczr4dZZuYEvgllxtBroP7icB442pRTLP5CKMglAd7phl2MNGz796vk\nhPbBaf0Ixgr9bd4hfFqwoSp2OYUVP0LfAthjt5exNFPhTrhLkVPEbcmqQFiidxPi\nbCqFPWrRXu/4JY7J90XaiFq60zynRCLvly2MyHd6pQKBgQDm7cVOclNj5B85W8c2\nHNEw0aXpip8uXFdQh2IJENb48wGFZ5nYuqch6ayzac2PmGci+jkNsPXfSfK25taj\nahQzaAS1zpr8ftlzXIA+X+TGjnUrg5jhyBJnbSEeGKJAf/qfWsaOaAxxQc/mSNsR\nq1H6SWuuekjNlWEoUcUaFVrZ3wKBgQDf0uW65uICdsN/J2hct8u8z05vIwKkLHcM\n3a8KFjtP/DLmnIaCBXTJA7U/oP8S7ETrV7m6eYypWSfbWIgxpzq3U+i4tNSJDqXv\ndeMPFr70SzWkKxZuqH2T4uMHvkUKFBV7xiBakNOS9DU/WLyHMWQJ5CHFL/vejMmz\nNZy4gAaXXQKBgQCP0FfmKNDCDtlbMUr46i1lB8sZjFjh2GQQJJ/rIW+fjkbOO9zV\n2jgnqI0DFssLuE/Sup45ZpFYw4bCXTQihPebpBX623Yt9Rma/GppbfLdrO5PcR8O\nzTiY7J+JTLIPFSSRhUjOewH0rpW4xnqXoGfnRT4oZMNeNL9TCsmDGvV/ZQKBgA/C\n4yiJL6sqv9OJa+DzlGZEVuqelYYIF44RYk0ciaq1QMRai2JGjhXFrBLB/JRRjPzh\nnZOTEaOvQo5Aqr6MXycfwoiXO0w3etnk/EtIt8OuNCXOXvMF7GnolUIrVONDzMt9\nhTO7dRqpFcLTNdtzT+8eYH5pRZxDX8S95r5bTZuFAoGATf50Ljs0w/5O2HihvXg/\nPbw2J7H5XypkAKSiJ3W/RkjUrf0pf+dGO3dlirk9Hm16KWEQxi0pipEwTPsNs2wN\nNwnIpeVRwboZXiCrtB/2iMG8S1hBAf9a099DcbeIRfIMQWahv3gRDtuB9h8fKJLi\nai4AJFoGW6fIGkus2NHjVyk=\n-----END PRIVATE KEY-----\n",
              clientEmail: "firebase-adminsdk-nivki@albayt-solo-web-50c59.iam.gserviceaccount.com",
          }
      //     {
      //   "projectId": "albayt-solo-web-50c59",
      //   "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDVelwjLB1ItdBW\nzgtnALR8biozveYzLrF553ujY4w/f61O9VOsxkMpwTQyo767sO8pIEKcDmCtHFhG\n4rmlFCtDmAZuwXLhqmFA3lpie1+ijduXTy4gfza8rZ0kSGYklacIcbZfhLa5FQBU\ny9AUUzltDTAKwt/SPFod6xdkhP23xe+FUjjZsE4EOyf7hFggmFiA1cxuPtX1HLuW\nRjNb3sbAp3T1EW8gRpEJmVD/lyDnN+kU18mxPvbcr3cnqLx0i1nYouVHfv/G6LQu\nf0W4PskoiXVcCEarcbLmiQhIaaf78kScMHGeKn5t1+LtiMGLf/ZW/UTNBAnsEXtV\nI/huCjWnAgMBAAECggEAB8OQ+Uh/8iaGormQqZjZd5MMHuCfsCnZE41rLjiPH7oV\nhAMhHW4CgFDCBLt20t2u/Qhq08EkG/elcEKLrOjMYAN17G5FrtZi/hh4Ig/JnSBa\npaigDVeDFp6b0fd+G4OD1SdJkjTB7n5Iikz1Tt/t/TzXC/UlbcB7KI5lxeaeUaIk\nrqAFfN2qvp1Ke2eAZnJaGLNXqz+8ykBkF9/+ayjpXhgn6PRkMoJtOn9fUTIsWmTC\nESfeVdwiYwr8XThcvDSrb0ff2iu3r5qwRX7/Pv5QRnsznczBwdc3Di3eQw81h5Tm\nJK1G7eNGHXJ30vXKDXsz3oqHMY+CwrLmzFUwnE1MEQKBgQD/zuY9g1Fnsee+tmWE\n18HPHAWcHCNdblga/fqo2rJspRROkqaiJa9KoLO2YsR4uHamTAEz3qaURsnVi6gx\nEd5F4boYVfGx4k5VaqhtwerIOYUFuU+moc7pjqUjcw65lDHc8WWIX6ik8Ci8M8uj\nD2P/x9BoqSazJ/nsrJhW5QfC0QKBgQDVo1Xl3lQzdj++55KFh1/ZdWn0AMINSJ1j\nLzCawownhO/JTlqQ8zhpKdbbDF00SQ6mhPcThAgdE05ceNs525IarsDwYePjXcT4\nOh35NIJfr92ZQUPDJgwpe3MSOEdEPpHEWX7bXwd2EFY+k8JF7VcozHX6QfhDW1rL\nDG71vdze9wKBgBNCOmdLKafK5w2eocn8jGTRUULNg4QXOJ7fnC12OZSgYQUBWXY/\nrBDMRHtouC32hUhD1JtZGeVz5uIi34jCNZ/BPMd0QPwJc6hOnVuWC90DJ5akuvBq\noi9HQ/uFQAiMtaxSqDg6K3IveoGgzKX8FKU/H9uhUH6QdepxnA5+s7ThAoGAWW7N\n57Oh1gU7fERe3w0jv9naJ+4lTgBG+p1noHGu0GBjLQdi/GkFBWkha4OKhPfMbUMe\nV4ofB2TsmeNyCo9zYz4iwL6J8sVvTmat44Pqy/nIL37VyhzkXH00V709gEEdLnA0\nncrzSaZfJEUgv7sykH6/KKtzLWdR48xpqu/3RVMCgYAbZf7zdDKO1ir3EVbC31kH\nYfyXU2AO46/OHIwZfHr0dk4REg15UETLGZon2gbJWuGCIr7l1bWRYoK6hGTnVwK9\nkCL6MV8xOzxCqSTB9M3HYpKBEfA1OOmELGWRmtLCGT74hG9kKj9jgm9imEfTxCG3\nvBBt3y6jrE1kgn0B+jITzg==\n-----END PRIVATE KEY-----\n",
      //   "clientEmail": "firebase-adminsdk-nivki@albayt-solo-web-50c59.iam.gserviceaccount.com",
      // }
      ),
    },
    "firebase-admin-app"
  );

export const firestore = getFirestore(firebaseApp);

export async function getPakets() {
    try {
        const snapshot = await firestore.collection("paket").get();
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting documents: ", error);
        throw error;
    }
}

export async function getPaket(namaPaket: string) {
  if (!namaPaket?.length) return;
  const doc = await firestore.collection("paket").doc(namaPaket).get()
  return doc.data()
}

export async function getUser(UID: string) {
    if (!UID?.length) return;
    const doc = await firestore.collection("users").doc(UID).get()
    return doc.data()
}

export const fetchDetailPurchase = async(purchaseID: string) => {
    const purchaseDoc = await firestore.collection("pembelian").doc(purchaseID).get()
    if (!purchaseDoc.exists) {
        return null ;
    }

    const purchaseData = purchaseDoc.data()
    const paketID = purchaseData ? purchaseData["paketID"] : ""
    const paketDoc = await getPaket(paketID)

    return {
        detailPembelian: purchaseData as PurchaseDetail,
        detailPaket: paketDoc
    }
}

export const fetchUserPurchaseDetail = async (userID: string) => {
    try {
        const userDoc = await firestore.collection("users").doc(userID).get()

        if (userDoc.exists) {
            const userData = userDoc.data();
            const riwayatPembelian = userData ? userData['riwayat-pembelian'] || [] : [];

            const purchaseDetails = []
            for (const purchaseID of riwayatPembelian) {
                const data = await fetchDetailPurchase(purchaseID)
                if (data !== null){
                    purchaseDetails.push(data)
                }
            }
            return purchaseDetails
        } else {
            console.log("Dokumen pengguna tidak ditemukan!");
            return [];
        }
    } catch (error) {
        console.error("Error fetching user purchase detail:", error);
        throw error;
    }
}