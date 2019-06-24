import React from 'react'

const Regexp = require('path-to-regexp');

function normalizePath(path, location) {
  if (!path) return location || '/';
  if (path[0] === '/') return path;
  if (parent == null) return path;
  return `location/${ path }`;
}

export default function RenderRoute(route, routePath, currentPath, location) {
  const params = {};

  const m = match(normalizePath(routePath, location), params, currentPath);

  if (m) {
    if (typeof route !== 'function') {
      return route;
    }

    return React.createElement(route, params);
  }

  return null;
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
    if (key) {
      // TODO: fix mutation of input parameter
      params[key.name] = val;
    }
  }

  return true;
}
