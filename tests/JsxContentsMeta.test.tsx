import {expect} from 'chai';
import 'mocha';
import {ContentFile, ContentFileCollection, Typesite} from "typesite";
import {JsxContentsMeta} from "../src/JsxContentsMeta";
import * as React from "react";
import {renderToString} from "react-dom/server";

describe("JsxContentsMeta", () => {
    it("Should call the render callback", () => {
        const pathSource = "test.txt";
        const fileSource = new ContentFile("test.txt", "");
        const filesSource = new ContentFileCollection("");
        const typesiteSource = new Typesite("", "");

        const meta = new JsxContentsMeta((path, file, files, typesite) => {
            expect(path).to.equal(pathSource);
            expect(file).to.equal(fileSource);
            expect(files).to.equal(filesSource);
            expect(typesite).to.equal(typesiteSource);

            return <div>Test</div>;
        });

        const expected = renderToString(<div>Test</div> as any);
        const result = renderToString(meta.render(pathSource, fileSource, filesSource, typesiteSource) as any);

        expect(result).to.equal(expected);
    });
});