import DbConnecton from "@/helpers/dbConnect";
import UserModel from "@/models/User";

import { NextResponse } from "next/server";

/*
GET ALL USERS
*/

export const GET = async (req) => {
  try {
    await DbConnecton();
    const user = await UserModel.find();
    if (user.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No users found",
      });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};
