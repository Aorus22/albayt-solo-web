import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const user_session = request.cookies.get('user_session');
    const url = request.nextUrl.clone();

    if (url.pathname === '/login') {
        if (!url.searchParams.has('redirect')) {
            return NextResponse.redirect(new URL('/', url.origin).toString());
        }
    } else if (!user_session) {
        const redirectUrl = new URL('/login', url.origin);
        redirectUrl.searchParams.append('redirect', url.pathname);
        return NextResponse.redirect(redirectUrl.toString());
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/paket/:paketID/pemesanan",
        "/paket/:paketID/pembayaran",
        "/riwayat-pembelian",
        "/detail-transaksi/:purchaseID/",
        "/pembayaran-final/:purchaseID/",
        "/info-profil",
        "/login"
    ],
};