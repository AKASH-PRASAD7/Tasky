import DbConnecton from "@/helpers/dbConnect";
import UserModel from "@/models/User";
import TaskModel from "@/models/Task";
import { NextResponse } from "next/server";

/*
ADD A TASK
*/

export const POST = async (req) => {
  try {
    await DbConnecton();
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};
