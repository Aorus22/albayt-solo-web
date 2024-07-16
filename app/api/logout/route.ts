import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("user_session");
        return response;
    } catch (error) {
        console.error("Logout failed:", error);
        return NextResponse.json({ error: "Logout failed. Please try again later." }, { status: 500 });
    }
}