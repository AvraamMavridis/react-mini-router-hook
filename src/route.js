
const Regexp = require('path-to-regexp')

export default function RouteBuild (routes) {
  return function routeBuild (location, props) {
    props = props || {}
    var params = {}

    for (var route in routes) {
      var m = match(route, params, location)
      var fn = routes[route]

      if (m) {
        if (typeof fn !== 'function') return fn
        else return fn(params, props)
      }
    }

    return null
  }
}

function match(path, params, pathname) {
  var keys = [];
  var regexp = Regexp(path, keys);
  var m = regexp.exec(pathname);

  if (!m) return false;
  else if (!params) return true;

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
    if (key) params[key.name] = val;
  }

  return true;
}
