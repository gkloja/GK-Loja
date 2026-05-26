export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  const targetPath = url.pathname.slice(1);

  if (!targetPath) {
    return new Response("Use /host:port/path", { status: 400 });
  }

  let targetUrl = targetPath.startsWith("http")
    ? targetPath
    : "http://" + targetPath;

  try {
    const response = await fetch(targetUrl);

    const headers = new Headers(response.headers);

    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "*");
    headers.set("Access-Control-Allow-Methods", "*");

    return new Response(response.body, {
      status: response.status,
      headers,
    });

  } catch (err) {
    return new Response("Erro: " + err.message, { status: 500 });
  }
} 