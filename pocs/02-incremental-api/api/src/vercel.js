export function createVercelHandler(handleRequest, pathname) {
  return async function vercelHandler(request, response) {
    const protocol = request.headers['x-forwarded-proto'] ?? 'https';
    const host = request.headers.host ?? 'localhost';
    const incomingUrl = new URL(request.url, `${protocol}://${host}`);
    incomingUrl.pathname = pathname;

    const webResponse = await handleRequest(new Request(incomingUrl, {
      method: request.method,
      headers: request.headers,
    }), process.env);

    response.statusCode = webResponse.status;
    webResponse.headers.forEach((value, name) => response.setHeader(name, value));
    response.end(await webResponse.text());
  };
}
