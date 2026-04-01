// Vercel Edge Middleware — panel.html'e doğrudan erişimi engelle
export const config = {
  matcher: '/birlikteiyilik-v2/yonetim/panel.html',
};

export default function middleware(req) {
  const cookieHeader = req.headers.get('cookie') || '';
  const hasBiaAuth = cookieHeader
    .split(';')
    .some(c => c.trim().startsWith('bia_auth=') && c.trim().split('=')[1]);

  if (!hasBiaAuth) {
    const loginUrl = new URL('/birlikteiyilik-v2/yonetim/', req.url);
    return Response.redirect(loginUrl, 302);
  }
}
