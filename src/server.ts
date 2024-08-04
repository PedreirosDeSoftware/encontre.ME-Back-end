import { app } from "./app";
import { env } from "./env/schema";

app.listen(env.PORT ,() => {
    console.log('Server is Running!');
});