import {expect} from 'chai';
import 'mocha';
import {ArgumentInvalidError, ArgumentNullError, ContentFile, ContentFileCollection, Typesite} from "typesite";
import {JsxContentsMeta} from "../src/JsxContentsMeta";
import * as React from "react";
import {renderToString} from "react-dom/server";

describe("JsxContentsMeta", () => {
    describe("Constructor argument validation", () => {
        it("render=null", () => {
            expect(() => new JsxContentsMeta(null as any)).to.throw(ArgumentNullError);
        });

        it("render=undefined", () => {
            expect(() => new JsxContentsMeta(null as any)).to.throw(ArgumentNullError);
        });

        const illegalArguments = [
            1,
            Number.NaN,
            "5",
            [],
            {},
            new Date()
        ];

        for (let argument of illegalArguments) {
            it(`render=${JSON.stringify(argument)}`, () => {
                expect(() => new JsxContentsMeta(argument as any)).to.throw(ArgumentInvalidError);
            });
        }
    });

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