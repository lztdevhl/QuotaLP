export function GET(request: Request) {
  // Deterministic entry route; manual locale links remain available on every page.
  return Response.redirect(new URL("/pt-br", request.url), 307);
}
