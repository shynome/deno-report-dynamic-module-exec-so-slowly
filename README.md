### run

```sh
deno run -A server.ts
```

### test
```sh
# import serve.ts. my test qps result is 79
wrk http://127.0.0.1:8000/b
# like b.ts but not import other. my test qps result is 6389
wrk http://127.0.0.1:8000/c
```
