import DbConnecton from "@/helpers/dbConnect";
import UserModel from "@/models/User";
import { hashPassword } from "@/helpers/hashPass";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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
    const token = await newUser.generateJwtToken();
    cookies().set({
      name: "token",
      value: token,
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      path: "/",
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

/*
SIGN IN USER
*/
