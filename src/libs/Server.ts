import logger from "morgan"
import express, {Express} from "express";
import morgan from "morgan";

// -- ROUTES -- \\

import { router as homePage } from "../routes/home"
import { router as helloWorld } from "../routes/helloworld"

import {ServerOptions} from "../types/serverOptions";


// -- Server -- \\

export class Server {
    private readonly port: number
    private readonly app: Express

    /**
     * Constructor function for the Server class.
     *
     * @param {ServerOptions} options - The options for the server.
     */
    public constructor(options: ServerOptions) {
        this.port = options.port;
        this.app = express();
        this.app.disable('x-powered-by');
        this.app.use(morgan("dev"));
        this.app.use("/public", express.static("./src/public", {
            cacheControl: true,
            etag: true,
            lastModified: true,
        }))

        // -- Set Routes -- \\

        this.app.use(homePage);
        this.app.use(helloWorld)
    }

    /**
     * Starts the server and listens on the specified port.
     *
     * @return {boolean|string} Returns true if the server started successfully,
     * or an error message if there was an exception.
     */
    public startServer(): boolean | string {
        try {
            const server = this.app.listen(this.port)
            return true
        } catch (e: any) {
            return e
        }
    }
}