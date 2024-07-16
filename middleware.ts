import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const user_session = request.cookies.get('user_session');

    if (!user_session) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.append('redirect', url.pathname);
        
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/paket/:paketID/pemesanan",
        "/paket/:paketID/pembayaran",
        "/riwayat-pembelian",
        "/detail-transaksi/:purchaseID/",
        "/pembayaran-final/:purchaseID/"
    ],
};
