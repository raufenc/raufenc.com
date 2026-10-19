// Hash tabanlı yönlendirici: '#/haberler/:id' → view(ctx)
const routes = [];
export function route(pattern, view) {
  const keys = [];
  const re = new RegExp('^' + pattern.replace(/\//g, '\\/').replace(/:(\w+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '\\/?$');
  routes.push({ re, keys, view });
}
export function match(hash) {
  const path = (hash || '#/').replace(/^#/, '').split('?')[0] || '/';
  const qs = new URLSearchParams((hash.split('?')[1] || ''));
  for (const r of routes) {
    const m = path.match(r.re);
    if (m) { const params = {}; r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); }); return { view: r.view, params, path, query: Object.fromEntries(qs) }; }
  }
  return null;
}
export const go = (hash) => { location.hash = hash; };
export const back = () => { if (history.length > 1) history.back(); else go('#/'); };
