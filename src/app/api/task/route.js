import DbConnecton from "@/helpers/dbConnect";
import UserModel from "@/models/User";
import TaskModel from "@/models/Task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import config from "@/config/config";
import mongoose from "mongoose";

/*
GELL ALL TASK
*/

export const GET = async (req) => {
  try {
    await DbConnecton();

    // Extract user ID from the token
    const cookie = req.cookies.get("token")?.value || "";
    if (!cookie) {
      return NextResponse.json({
        success: false,
        message: "Sign In to get tasks!",
      });
    }

    const userId = jwt.verify(cookie, config.secretKey).user;

    const tasks = await TaskModel.find({ userid: userId });

    if (tasks.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No task found Add task",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};

/*
ADD A TASK
*/

export const POST = async (req) => {
  try {
    await DbConnecton();
    let { title, type, description } = {};
    try {
      ({ title, type, description } = await req.json());
    } catch (jsonError) {
      return NextResponse.json({
        success: false,
        message: "Invalid or empty request body",
      });
    }

    if (!title || !description) {
      return NextResponse.json({
        success: false,
        message: "title and description are required",
      });
    }

    const cookie = req.cookies.get("token")?.value || "";
    if (!cookie) {
      return NextResponse.json({
        success: false,
        message: "Sign In to add task!",
      });
    }

    const userId = jwt.verify(cookie, config.secretKey).user;
    let task = {
      title,
      type,
      description,
      userid: userId,
    };
    const newTask = await TaskModel.create(task);
    if (!newTask) {
      return NextResponse.json({
        success: false,
        message: "Failed to add task",
      });
    }
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { tasks: newTask._id } },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      message: "Task added",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};

/*
UPDATE A TASK
*/

export const PUT = async (req) => {
  try {
    await DbConnecton();
    let { taskId, title, type, description } = {};
    try {
      ({ taskId, title, type, description } = await req.json());
    } catch (jsonError) {
      return NextResponse.json({
        success: false,
        message: "Invalid or empty request body",
      });
    }

    if (!taskId) {
      return NextResponse.json({
        success: false,
        message: "Task ID is required",
      });
    }

    const cookie = req.cookies.get("token")?.value || "";
    if (!cookie) {
      return NextResponse.json({
        success: false,
        message: "Sign In to update task!",
      });
    }

    const userId = jwt.verify(cookie, config.secretKey).user;

    // Check if the task belongs to the user
    const task = await TaskModel.findOne({ _id: taskId, userid: userId });

    if (!task) {
      return NextResponse.json({
        success: false,
        message: "Task not found or does not belong to the user.",
      });
    }

    // Update the task
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId },
      { $set: { title, type, description } },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({
        success: false,
        message: "Failed to update task.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Task updated",
      task: updatedTask,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};

/*
DELETE A TASK
*/

export const DELETE = async (req) => {
  try {
    await DbConnecton();

    let { taskId } = await req.json();

    if (!taskId) {
      return NextResponse.json({
        success: false,
        message: "Task ID is required",
      });
    }

    // Check if taskId is a valid ObjectId
    if (!mongoose.isValidObjectId(taskId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const cookie = req.cookies.get("token")?.value || "";
    if (!cookie) {
      return NextResponse.json({
        success: false,
        message: "Sign In to delete task!",
      });
    }

    const userId = jwt.verify(cookie, config.secretKey).user;

    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      userid: userId,
    });

    if (!deletedTask) {
      return NextResponse.json({
        success: false,
        message: "Failed to delete task. Task not found or unauthorized.",
      });
    }

    // Remove the task reference from the user's document
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { tasks: taskId } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};
