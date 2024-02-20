import DbConnecton from "@/helpers/dbConnect";
import UserModel from "@/models/User";
import { hashPassword } from "@/helpers/hashPass";
import { NextRequest, NextResponse } from "next/server";

/*
SIGN UP USER
*/

export const POST = async (req) => {
  try {
    await DbConnecton();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    //check if user already exist
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //create user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return NextResponse.json({
        success: false,
        message: "Failed to sign up",
      });
    }

    //Send cookie
    const res = NextResponse.next({
      request: {
        headers: new Headers(req.Headers),
      },
    });
    const token = await newUser.generateJwtToken();
    const oneDay = 24 * 60 * 60 * 1000;
    NextResponse.cookies().set("token", token, {
      maxAge: oneDay,
      httpOnly: true,
      path: "/",
      sameSite: "None",
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};
