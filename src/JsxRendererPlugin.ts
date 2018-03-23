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
                if (meta instanceof JsxContentsMeta) {
                    this.renderMeta(meta, path, file, files, typesite);
                }
            });

            if (file.metadata.hasItem(JsxContentsMeta)) {
                file.setContents(file.metadata.getItem(JsxContentsMeta).contents);
            }
        });
    }

    private renderMeta(meta: JsxContentsMeta, targetPath: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite): void {
        const contentJsx = meta.render(targetPath, file, files, typesite);

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