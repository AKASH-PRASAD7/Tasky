import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/*
SIGN OUT USER
*/

export const POST = async (req) => {
  try {
    cookies().delete("token");
    return NextResponse.json({
      success: true,
      message: "Signed Out",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};
