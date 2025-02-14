import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

interface Props {
  params: {
    _id: string;
  };
}
export const GET = async (request: Request, { params }: Props) => {
  console.log(params._id, "Estutado");
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params?._id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch All posts", { status: 500 });
  }
};
