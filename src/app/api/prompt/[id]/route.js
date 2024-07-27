import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/ database";
import mongoose from "mongoose";

//GET to retreive single propmt for edit

export const GET = async (req, { params }) => {
  try {
    connectToDB();

    const propmt = await Prompt.findById(params.id).populate("creator");
    if (!propmt) return new Response("Prompt not Found", { status: 404 });
    return new Response(JSON.stringify(propmt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Validate the ID
    const { id } = params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    // Find and delete the prompt
    const result = await Prompt.findByIdAndDelete(id);

    if (!result) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response("Error deleting prompt", { status: 500 });
  }
};
