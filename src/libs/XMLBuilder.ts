import * as XML from "xml2js"

export class XMLBuilder {
    private readonly xmlData: object

    public constructor(data: object) {
        this.xmlData = data
    }

    public createXMLDocument(): string {
        return new XML.Builder({
            renderOpts: {
                pretty: true,
            }
        }).buildObject(this.xmlData)
    }
}