// src/lib/firebase/firebase-admin.ts

import "server-only";

import {cert, getApps, initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

export const firebaseApp =
  getApps().find((it) => it.name === "firebase-admin-app") ||
  initializeApp(
    {
      credential: cert(
      //     {
      //   "projectId": "albayt-solo-web-50c59",
      //   "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDVelwjLB1ItdBW\nzgtnALR8biozveYzLrF553ujY4w/f61O9VOsxkMpwTQyo767sO8pIEKcDmCtHFhG\n4rmlFCtDmAZuwXLhqmFA3lpie1+ijduXTy4gfza8rZ0kSGYklacIcbZfhLa5FQBU\ny9AUUzltDTAKwt/SPFod6xdkhP23xe+FUjjZsE4EOyf7hFggmFiA1cxuPtX1HLuW\nRjNb3sbAp3T1EW8gRpEJmVD/lyDnN+kU18mxPvbcr3cnqLx0i1nYouVHfv/G6LQu\nf0W4PskoiXVcCEarcbLmiQhIaaf78kScMHGeKn5t1+LtiMGLf/ZW/UTNBAnsEXtV\nI/huCjWnAgMBAAECggEAB8OQ+Uh/8iaGormQqZjZd5MMHuCfsCnZE41rLjiPH7oV\nhAMhHW4CgFDCBLt20t2u/Qhq08EkG/elcEKLrOjMYAN17G5FrtZi/hh4Ig/JnSBa\npaigDVeDFp6b0fd+G4OD1SdJkjTB7n5Iikz1Tt/t/TzXC/UlbcB7KI5lxeaeUaIk\nrqAFfN2qvp1Ke2eAZnJaGLNXqz+8ykBkF9/+ayjpXhgn6PRkMoJtOn9fUTIsWmTC\nESfeVdwiYwr8XThcvDSrb0ff2iu3r5qwRX7/Pv5QRnsznczBwdc3Di3eQw81h5Tm\nJK1G7eNGHXJ30vXKDXsz3oqHMY+CwrLmzFUwnE1MEQKBgQD/zuY9g1Fnsee+tmWE\n18HPHAWcHCNdblga/fqo2rJspRROkqaiJa9KoLO2YsR4uHamTAEz3qaURsnVi6gx\nEd5F4boYVfGx4k5VaqhtwerIOYUFuU+moc7pjqUjcw65lDHc8WWIX6ik8Ci8M8uj\nD2P/x9BoqSazJ/nsrJhW5QfC0QKBgQDVo1Xl3lQzdj++55KFh1/ZdWn0AMINSJ1j\nLzCawownhO/JTlqQ8zhpKdbbDF00SQ6mhPcThAgdE05ceNs525IarsDwYePjXcT4\nOh35NIJfr92ZQUPDJgwpe3MSOEdEPpHEWX7bXwd2EFY+k8JF7VcozHX6QfhDW1rL\nDG71vdze9wKBgBNCOmdLKafK5w2eocn8jGTRUULNg4QXOJ7fnC12OZSgYQUBWXY/\nrBDMRHtouC32hUhD1JtZGeVz5uIi34jCNZ/BPMd0QPwJc6hOnVuWC90DJ5akuvBq\noi9HQ/uFQAiMtaxSqDg6K3IveoGgzKX8FKU/H9uhUH6QdepxnA5+s7ThAoGAWW7N\n57Oh1gU7fERe3w0jv9naJ+4lTgBG+p1noHGu0GBjLQdi/GkFBWkha4OKhPfMbUMe\nV4ofB2TsmeNyCo9zYz4iwL6J8sVvTmat44Pqy/nIL37VyhzkXH00V709gEEdLnA0\nncrzSaZfJEUgv7sykH6/KKtzLWdR48xpqu/3RVMCgYAbZf7zdDKO1ir3EVbC31kH\nYfyXU2AO46/OHIwZfHr0dk4REg15UETLGZon2gbJWuGCIr7l1bWRYoK6hGTnVwK9\nkCL6MV8xOzxCqSTB9M3HYpKBEfA1OOmELGWRmtLCGT74hG9kKj9jgm9imEfTxCG3\nvBBt3y6jrE1kgn0B+jITzg==\n-----END PRIVATE KEY-----\n",
      //   "clientEmail": "firebase-adminsdk-nivki@albayt-solo-web-50c59.iam.gserviceaccount.com",
      // }
          {
              "projectId": "albayt-backup-test",
              "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD3aegRX98rC64U\n9zawkSAKWVNyHq2SnxrDHnOhBm4VgMzvjbhoK8zAmqU+slQlDhW/ewe8cNoKXv9H\n9jlrsOdKzuDkOylE708A7K7AU9KyQQydx0qcjYmQXgRAZgHzyBItOJ7rv+iXYJA9\nmD2xMIldjYdYkN4OHEqawDLxGBpfR1OiSzaH2BAHcOaOR0MJYgDTVbjX81wVhWZ7\n9bObDdl05wmTOb6f3mR/UUEbZ9v0l1+Z4nrcQIpjOoBpa6zRHWTp26v/+V6d6YIo\nISaZaGva/1iJ0YTKfrcCiqECEOba8xyqp2I1LSknhGtWuv/VRQLmBSQXKB3DfQdS\nTJQtQvExAgMBAAECggEAJm3tTXGSROniBsClXoSUMPdR9kpclIchDYiX1j2c8Lsa\nWeUt7QRMn+gFXbkuR7kp2J2gBH2U6IJ77W4J2jfWnTCIDvs/fEUdhNu+gwIiGmzv\nLDyt0qZLZUCtMWGG0RpU9HA0gxLCamzlyqNwhaqv03etu6x4yUFMtz++SeOACSdJ\nX+V4gKieArnVLX/lMo8VyGkzK1xs6b9aALoaU98xMkGP8NuxL3tYch2hz2dUghVY\nUmpJeS4PSTLi/7IizxirtF8UxBmxBhORQYmuOhxWckO/6bNCX+oHyMJMsh0y0fcu\npp73NlTDWzYH2WlMsYx8MgeoXcxwegFgdja+iBvLlwKBgQD860R01U6hnXEG0QzM\nPHAWOPV2+8fy1adJGhbHPkuWd4GeF8d65lBMdHp7NgnN3wEBLeHNAbLrL3XV2HKw\n0//5avHGiDQSGbHSFtRVtKVNaHYxWl6Vwh9oTX1xppLwzZQB6glBfP0xMw0Y10ch\norynwivL2Ma+Eoe2lWoo7sVv4wKBgQD6bXh+XxQIkPVm6sIPbbAH9s9fz3rPlljS\nLGox3HAMm3lB01mRSo+eAoNIFts1i2y83GBY3WtYYJdbK467QBx7WdMr0QLykNo2\n9kEdgF4O09sYYvyVJbXjl5Z8HPAGMYj8jc1SxTCXswt/Bl76u3ZRfsPLg2fRRrWN\nTlBDApP+2wKBgAvQHUlrsRmBVgcgen2LkRyommZtSiCAdCjI7ClwMm2btVUh/TIz\nUarQgewBUSHpeY2JjBNcMfQkKlfLnUe/DySiJxrDv9Lcml6arF44asQbzfFuLB7I\ni1j+zY4iXpiasYAJY1dItDa5ELKJU4wxoqgfPJZv0JCOIwKXJfc1d8lLAoGBAOFB\n8u6JC3YhHfxzEhfarEqdoS8na+qp7D8xIFy1Ujyk5M9nEtvz23df/0Kq/IcPYMII\n4MlOca5PRBYH+h1Ir9XsmFyDZ0lVLlPd8fhdbT2dJyiqcVSfVRrhUcVWKjkH+ZZi\n3tui7/CkZqTd0DVsxiLMCcZX7tx54/i1BtEf0oudAoGAO/52s+GO9CoEgDASGp2F\npgW6XdQNIRhSngeQmwvM52TmpTGRO2dNydeC6QeXHRen+qy7N140QILJX2GD2uMl\nZjeWDIZzQaiOqo0vZwl6DYyvS2Y2XcmdT+Nx1CiJDYvvhiIS4oXcU0bZCfBEXHz/\nZDQEZwLucbrLItQIx8mf5Sk=\n-----END PRIVATE KEY-----\n",
              "clientEmail": "firebase-adminsdk-y5i6u@albayt-backup-test.iam.gserviceaccount.com",
          },
      ),
    },
    "firebase-admin-app"
  );

export const firestore = getFirestore(firebaseApp);

export async function getPakets() {
  const docs = await firestore.collection("paket").listDocuments()
  let res: any[] = []
  for (const doc of docs) {
    res.push((await doc.get()).data())
  }
  return res
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
        detailPembelian: purchaseData,
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