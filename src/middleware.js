import { NextResponse } from "next/server";
import verifyCookie from "./helpers/verifyCookie";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value || "";
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/signup" || path === "/signin";

  try {
    // const isValid = await verifyCookie(token);

    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/signin", request.nextUrl));
    }
  } catch (err) {
    console.error(err);
    return NextResponse.error(new Error("Authentication failed"));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signin", "/signup"],
};
