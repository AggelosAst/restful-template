import express, {NextFunction, Request, Response, Router} from "express";
import {XMLBuilder} from "../libs/XMLBuilder";
import {XML} from "../middlewares/XML";

const router: Router = express.Router({
    caseSensitive: true
})

router.get("/", XML.useXML, async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    return res.status(200).send(new XMLBuilder({
        status: "UP"
    }).createXMLDocument())
})

export {router}