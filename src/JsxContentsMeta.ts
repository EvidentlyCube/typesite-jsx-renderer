import {Typesite, ContentFile, IMeta, ArgumentNullError} from 'typesite';

export class JsxContentsMeta implements IMeta {
    private _render:(file:ContentFile, typesite:Typesite) => JSX.Element;
    public contents:string;

    getKey(): string {
        return "jsxContents";
    }

    constructor(render: (file:ContentFile, typesite:Typesite) => JSX.Element) {
        if (!render){
            throw new ArgumentNullError("render");
        }

        this._render = render;
    }

    public render(file:ContentFile, typesite:Typesite): JSX.Element{
        return this._render(file, typesite);
    }
}