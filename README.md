# Typesite-filter-out

A plugin for [Typesite](https://github.com/EvidentlyCube/typesite) that allows you to render JSX to HTML easily, even if you want to have multiple JSX fragments in the same file.

## Installation

Run `npm install typesite-filter-out`

## How to use

First register `JsxRendererPlugin` plugin in your Typesite project:
 
```typescript
typesite.use(new JsxRendererPlugin(true));
```

Then add `JsxContentsMeta` to the frontmatter of whatever files you want to have JSX contents. It takes a callback which will be given `ContentFile` and `Typesite` as params and will expect you to return `JSX.Element`.

**This will overwrite** content sent by just having a string in the frontmatter. 

```typescript
export default new Frontmatter(
    new JsxContentsMeta((path:string, file:ContentFile, files:ContentFileCollection, typesite:Typesite) => {
        return <div className="main-page">
            This will be my <strong>main</strong> content
        </div>;
    }),
    "This string content will be overwritten."
);
```

## Multiple JSX fragments

If you want to have multiple JSX fragments in one file, for example a summary for a blog post, you first have to create a new class extending `JsxContentsMeta`:

```typescript
export class JsxSummaryMeta extends JsxContentsMeta{
    getKey(): string {
        return "summaryJsx";
    }
}
```

**It's absolutely necessary to override `getKey`!** Then register the meta in frontmatter:

```typescript

export default new Frontmatter(
    new JsxContentsMeta((path:string, file:ContentFile, files:ContentFileCollection, typesite:Typesite) => ...),
    new JsxSummaryMeta((path:string, file:ContentFile, files:ContentFileCollection, typesite:Typesite) => ...)
);
```

You can later access its contents as string with:

```typescript
file.metadata.getItem(JsxSummaryMeta).contents;
```

**Important:** when you have multiple metas extending `JsxContentsMeta` only the base one will be transferred to `ContentFile`'s contents.

## API

### `JsxContentsPlugin`
The plugin responsible for rendering the JSX metas:

#### `constructor`

 * **Argument** `removeDataReactRoot :boolean` Controls wheteher to remove any and all `data-reactroot` attributes that might appear 
 
### `JsxContentsMeta`
Meta class that builds the JSX for the page's contents:

#### `constructor`

 * **Argument** `render: (path:string, file:ContentFile, files:ContentFileCollection, typesite:Typesite) => JSX.Element` A function that expects file path, rendered file, files collection & typescite instace and should return `JSX.Element` with the page's contents which will later be rendered to string.
 * **Exception** `Typesite.ArgumentNullError` When `render` is null
 * **Exception** `Typesite.ArgumentInvalidError` When `render` is not a function

#### Properties
 * `contents:string` The rendered JSX