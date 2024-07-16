import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user } = body

        const user_session = {
            uid: user.uid,
            email: user.email
        }

        const response = NextResponse.json({ message: 'Login successful' });
        response.cookies.set('user_session', JSON.stringify(user_session), { httpOnly: true, secure: true });
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        return NextResponse.json({ error: 'Login failed. Please try again later.' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const sessionUserCookie = request.cookies.get('user_session');

        if (!sessionUserCookie) {
            return NextResponse.json({ error: 'Session user cookie not found' }, { status: 404 });
        }

        const sessionUser = JSON.parse(sessionUserCookie.value);
        return NextResponse.json({ sessionUser });
    } catch (error) {
        console.error('Failed to retrieve user_session cookie:', error);
        return NextResponse.json({ error: 'Failed to retrieve user_session cookie' }, { status: 500 });
    }
}
