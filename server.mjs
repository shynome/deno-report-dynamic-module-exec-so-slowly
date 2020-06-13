import { createServer, IncomingMessage, ServerResponse } from "http";

/**@type {{ [k: string]: string }} */
let routes = {
  "/b": "./b.mjs",
  "/c": "./c.mjs",
};

/**@type {{[k:string]:Promise<any>}} */
let c = {};
/**
 *
 * @param {string} k
 */
const _import = (k) => {
  c[k] = c[k] || import(k);
  return c[k];
};

// preheat
await Promise.all(
  Object.keys(routes).map((k) => {
    let m = routes[k];
    return _import(m);
  })
);

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
async function handle(req, res) {
  let path = new URL(req.url || "/", "http://x").pathname;
  let mpath = path in routes ? routes[path] : null;
  if (mpath === null) {
    res.statusCode = 404;
    res.end("404");
    return;
  }
  const m = await _import(mpath);
  const response = await m.default(req, res);
  if (res.headersSent === false && typeof response === "string") {
    res.end(response);
  }
}

const s = createServer(handle);
s.listen(8000);
console.log(`http://localhost:8000/`);
