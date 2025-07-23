import dummyPosts from "@/dummyPosts";

export function GET(request: Request, { id }: { id: string }) {
  const post = dummyPosts.find((p) => p.id == parseInt(id));

  if (!post) return new Response("Post not found", { status: 404 });

  return Response.json({ post });
}

export function DELETE() {
  return new Response("Not implemented");
}

export function PATCH() {
  return new Response("Not implemented");
}
