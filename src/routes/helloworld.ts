import express, {NextFunction, Request, Response, Router} from "express";
import {XMLBuilder} from "../libs/XMLBuilder";

const visits: Record<string, number> = {
    "discord": 0,
    "user": 0
}

const router: Router = express.Router({
    caseSensitive: true
})

router.get("/helloworld", async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const userAgent: string | undefined = req.headers["user-agent"] as string | undefined
    if (userAgent) {
        console.log(userAgent)
        if (userAgent.toLowerCase().includes("bot") || userAgent.toLowerCase().includes("macintosh")) {
            visits["discord"]++
            return res.status(200).sendFile("33630d659b16dbf2641fe9050e6cab00.mp4", {
                root: "./src/public/img"
            })
        } else {
            visits["user"]++
            res.set("Content-Type", "application/xml")
            return res.status(200).send(new XMLBuilder({
                status: "Hi there, friend! :]",
                telemetry: {
                    totalVisits: {
                        DiscordBot: visits["discord"],
                        User: visits["user"]
                    }
                }
            }).createXMLDocument())
        }
    } else {
        res.set("Content-Type", "application/xml")
        return res.status(200).send(new XMLBuilder({
            status: "How dare you my friend, no user agent?"
        }).createXMLDocument())
    }
})

export {router}