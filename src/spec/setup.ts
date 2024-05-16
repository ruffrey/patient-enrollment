import { app, httpServer, main } from "../server/main";

before(async() => {
    await main();
    console.log("started server in tests")
})

after(() => {
    return new Promise((resolve) => {
        // @ts-ignore
        httpServer.close(() => {
            console.log("shutdown server in tests")
            resolve();
        });
    })
})