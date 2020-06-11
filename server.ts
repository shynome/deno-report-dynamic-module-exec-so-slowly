import {
  serve,
  ServerRequest,
} from "https://deno.land/std@0.56.0/http/server.ts";

const s = serve({ port: 8000 });

let routes: { [k: string]: string } = {
  "/b": "./b.ts",
  "/c": "./c.ts",
};

// preheat
await Promise.all(
  Object.keys(routes).map((k) => {
    let m = routes[k];
    import(m);
  }),
);

async function handle(req: ServerRequest) {
  let path = new URL(req.url, "http://x").pathname;
  let mpath = path in routes ? routes[path] : null;
  if (mpath === null) {
    req.respond({ status: 404, body: "404" });
    return;
  }
  const m = await import(mpath);
  const response = await m.default(req);
  if (req.w.buffered() === 0 && typeof response === "string") {
    req.respond({ body: response });
  }
}

console.log(`http://localhost:8000/`);
for await (const req of s) {
  handle(req);
}
