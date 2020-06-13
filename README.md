### run

```sh
node --harmony-top-level-await server.mjs
```

### test

```sh
# import serve.ts. my test qps result is 6813
wrk http://127.0.0.1:8000/b
# like b.ts but not import other. my test qps result is 6971
wrk http://127.0.0.1:8000/c
```
