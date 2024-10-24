para rodar:
pre-req, uma api (na pasta api, após instalar deps, rodar "go run .") ou mock: 
0. localhost:3000/api/some-bff
    a. deve retornar status code 417 na primeira chamada
    b. body: {
        "challenge": "URA"
        }
    c. nas outras chamadas, para simular usuário autenticado, retornar
    d. body: {
        data: "ok, autenticado, seu recurso bff"
    }
0.1. localhost:3000/api/check-authentication r
    a. body {
        "authenticatedByUser": boolean
        }
1. faça o build o risk engine mfe: pnpm build
2. execute: rm -rf ../my-host-app/public/dist &&  mv dist ../my-host-app/public
3. no host app, pnpm dev.