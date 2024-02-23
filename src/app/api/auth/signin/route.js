import DbConnecton from "@/helpers/dbConnect";
import UserModel from "@/models/User";
import { comparePassword } from "@/helpers/hashPass";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/*
SIGN IN USER
*/

export const POST = async (req) => {
  try {
    await DbConnecton();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    //check if user exist
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //send cookie
    const token = await user.generateJwtToken();
    cookies().set({
      name: "token",
      value: token,
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};
