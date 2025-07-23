export function GET(request: Request) {
  console.log("Hello");
  console.log(process.env.SECRET_KEY);
  console.log(process.env.EXPO_PUBLIC_SHARED_KEY);
  return Response.json({ Hello: "World" });
}
