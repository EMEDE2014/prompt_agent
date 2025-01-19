import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

interface Props {
  params: {
    id: string;
  };
}

// GET (read)
export const GET = async (request: Request, { params }: Props) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch All posts", { status: 500 });
  }
};

// PATCH (update)

export const PATCH = async (request: Request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed update prompt", { status: 500 });
  }
};

// DELETE (delte)

export const DELETE = async (request: Request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed delete prompt", { status: 500 });
  }
};
