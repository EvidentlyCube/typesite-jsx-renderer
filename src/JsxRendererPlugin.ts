import {ContentFile, ContentFileCollection, IPlugin, Typesite} from 'typesite';
import {JsxContentsMeta} from "./JsxContentsMeta";
import {renderToString} from "react-dom/server";

export class JsxRendererPlugin implements IPlugin {
    private _removeDataReactRoot: boolean;

    constructor(removeDataReactRoot: boolean) {
        this._removeDataReactRoot = removeDataReactRoot;
    }

    getName(): string {
        return "JsxRendererPlugin";
    }

    run(files: ContentFileCollection, typesite: Typesite): Promise<void> {
        return files.eachAsync((file, path) => {
            file.metadata.getAllItems().forEach(meta => {
                if (meta instanceof JsxContentsMeta){
                    this.renderMeta(meta, file, typesite);
                }
            });

            if (file.metadata.hasItem(JsxContentsMeta)) {
                file.setContents(file.metadata.getItem(JsxContentsMeta).contents);
            }
        });
    }

    private renderMeta(meta: JsxContentsMeta, file: ContentFile, typesite: Typesite): void {
        const contentJsx = meta.render(file, typesite);

        meta.contents = this.renderToString(contentJsx);
    }

    private renderToString(content: JSX.Element): string {
        let contentString = renderToString(<any>content);

        if (this._removeDataReactRoot) {
            contentString = contentString.replace(/\s*data-reactroot=".*?"/, "");
        }

        return contentString;
    }
}