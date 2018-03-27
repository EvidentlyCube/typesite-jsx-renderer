import {ArgumentInvalidError, ArgumentNullError, ContentFile, ContentFileCollection, IMeta, Typesite} from 'typesite';

export class JsxContentsMeta implements IMeta {
    private _render: (targetPath: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite) => JSX.Element;
    public contents: string;

    getKey(): string {
        return "jsxContents";
    }

    constructor(render: (targetPath: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite) => JSX.Element) {
        if (render === null) {
            throw new ArgumentNullError("render", "Render cannot be null");
        }

        if (typeof render !== "function") {
            throw new ArgumentInvalidError("render", `render has to be a function, '${JSON.stringify(render)} (${typeof render})' was given`);
        }

        this._render = render;
    }

    public render(targetPath: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite): JSX.Element {
        return this._render(targetPath, file, files, typesite);
    }
}