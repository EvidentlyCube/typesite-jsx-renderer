import {expect} from 'chai';
import 'mocha';
import {ContentFile, Typesite} from "typesite";
import {JsxContentsMeta} from "../src/JsxContentsMeta";
import * as React from "react";
import {renderToString} from "react-dom/server";

describe("JsxContentsMeta", () => {
    it("Should call the render callback", () => {
        const fileSource = new ContentFile("test.txt", "");
        const typesiteSource = new Typesite("", "");
        const meta = new JsxContentsMeta((file, typesite) => {
            expect(file).to.equal(fileSource);
            expect(typesite).to.equal(typesiteSource);

            return <div>Test</div>;
        });

        const expected = renderToString(<div>Test</div> as any);
        const result = renderToString(meta.render(fileSource, typesiteSource) as any);

        expect(result).to.equal(expected);
    });
});