import { main } from "./main";

main().catch(e => {
    console.error("Unexpected server error", e);
    process.exit(1);
});
