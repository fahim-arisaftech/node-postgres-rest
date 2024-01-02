import express from 'express';
import { createConnection } from 'typeorm';

import CustomerRoutes from "./routes/Customer";
import BankerRoutes from "./routes/Banker";

const app = express();
const port = process.env.PORT || '8000';

const startServer = async () => {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "1202",
            database: "minibank",
            synchronize: true,
            entities: [__dirname + "/entities/*{.js,.ts}"]
        });
        console.log("connected to postgres database")
    } catch(error) {
        throw new Error(`Unable to connect to DB: ${error}`)
    }

    app.use(express.json());

    app.use("/api", CustomerRoutes);
    app.use("/api", BankerRoutes);

    app.listen(port, () => console.log(`Server started at: http://localhost:${port}`));
}

startServer();