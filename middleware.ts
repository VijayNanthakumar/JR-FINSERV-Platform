import { NextRequest, NextResponse } from "next/server";

/**
 * Decode a JWT payload without verifying the signature.
 * Used only in middleware to check token expiry.
 * Actual user validation happens server-side via Supabase.
 */
function decodeJwtExpiry(token: string): number | null {
	try {
		const [, payload] = token.split(".");
		const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
		return typeof decoded.exp === "number" ? decoded.exp : null;
	} catch {
		return null;
	}
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isLoginPage = pathname === "/portal/login";

	const accessToken = request.cookies.get("sb-access-token")?.value;

	// No token present — let login page through, redirect everything else
	if (!accessToken) {
		if (isLoginPage) return NextResponse.next();
		return NextResponse.redirect(new URL("/portal/login", request.url));
	}

	// Check token expiry via JWT decode (no network call needed)
	const exp = decodeJwtExpiry(accessToken);
	const isExpired = exp !== null && exp * 1000 < Date.now();

	if (isExpired) {
		const response = NextResponse.redirect(new URL("/portal/login", request.url));
		response.cookies.delete("sb-access-token");
		response.cookies.delete("sb-refresh-token");
		return response;
	}

	// Valid token — redirect authenticated users away from login
	if (isLoginPage) {
		return NextResponse.redirect(new URL("/portal/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/portal/:path*"],
};
