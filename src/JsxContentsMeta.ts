import {ArgumentNullError, ContentFile, ContentFileCollection, IMeta, Typesite} from 'typesite';

export class JsxContentsMeta implements IMeta {
    private _render: (targetPath: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite) => JSX.Element;
    public contents: string;

    getKey(): string {
        return "jsxContents";
    }

    constructor(render: (targetPath: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite) => JSX.Element) {
        if (!render) {
            throw new ArgumentNullError("render");
        }

        this._render = render;
    }

    public render(targetPath: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite): JSX.Element {
        return this._render(targetPath, file, files, typesite);
    }
}