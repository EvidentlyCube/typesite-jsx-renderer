import {expect} from 'chai';
import 'mocha';
import {ContentFile, ContentFileCollection, Typesite} from "typesite";
import {JsxContentsMeta} from "../src/JsxContentsMeta";
import * as React from "react";
import {JsxRendererPlugin} from "../src/JsxRendererPlugin";

describe("JsxRendererPlugin", () => {
    it("Will render all JsxContentsMeta plugins and set the contents to the default one", async () => {
        const file = new ContentFile("test.txt", "");
        const files = new ContentFileCollection("test.txt");
        const plugin = new JsxRendererPlugin(true);

        file.metadata.setItem(new JsxContentsMeta(() => <div>This is content body</div>));
        file.metadata.setItem(new TestJsxMeta(() => <div>This is summary</div>));

        files.addFile("out.txt", file);

        await plugin.run(files, new Typesite("", ""));

        expect(file.metadata.getItem(JsxContentsMeta).contents).to.equal("<div>This is content body</div>");
        expect(file.metadata.getItem(TestJsxMeta).contents).to.equal("<div>This is summary</div>");
        expect(file.getContents().toString()).to.equal("<div>This is content body</div>");

    });

    it("Should pass all the params to the meta render", async () => {
        const pathSource = "out.txt";
        const fileSource = new ContentFile("test.txt", "");
        const filesSource = new ContentFileCollection("");
        const typesiteSource = new Typesite("", "");
        const plugin = new JsxRendererPlugin(true);

        filesSource.addFile(pathSource, fileSource);

        fileSource.metadata.setItem(new JsxContentsMeta((path, file, files, typesite) => {
            expect(path).to.equal(pathSource);
            expect(file).to.equal(fileSource);
            expect(files).to.equal(filesSource);
            expect(typesite).to.equal(typesiteSource);

            return <div>Test</div>;
        }));

        await plugin.run(filesSource, typesiteSource);
    });
});

class TestJsxMeta extends JsxContentsMeta {
    getKey(): string {
        return "testJsx";
    }
}