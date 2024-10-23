para rodar:
pre-req, uma api ou mock 
0. localhost:3000/api/error-417
    a. deve retornar status code 417
    b. body: {
        "challenge": "URA"
        }
0.1. localhost:3000/api/check-authentication r
    a. body {
        "authenticatedByUser": boolean
        }
1. faça o build o risk engine mfe: pnpm build
2. execute: rm -rf ../my-host-app/public/dist &&  mv dist ../my-host-app/public
3. no host app, pnpm dev.