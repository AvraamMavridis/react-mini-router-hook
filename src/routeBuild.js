
const Regexp = require('path-to-regexp');

export default function RouteBuild (routes) {
  return function routeBuild (location, props) {
    props = props || {};
    const params = {};

    for (const route in routes) {
      const m = match(route, params, location);
      const fn = routes[route];

      if (m) {
        if (typeof fn !== 'function') return fn;
        return fn(params, props);
      }
    }

    return null;
  };
}

function match(path, params, pathname) {
  const keys = [];
  const regexp = Regexp(path, keys);
  const m = regexp.exec(pathname);

  if (!m) return false;
  else if (!params) return true;

  for (let i = 1, len = m.length; i < len; ++i) {
    const key = keys[i - 1];
    const val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) params[key.name] = val;
  }

  return true;
}
