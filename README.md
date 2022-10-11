# Mini Docs

This app lets you focus on writing your content similar to writing a blog or book.

Focus on writing markdown (`*.md`) files. Use **VSCode** (https://code.visualstudio.com/) to have a preview of your writing.

Make sure to enable **Format on Save** to automatically format your `.md` files everytime you save.

No live servers are needed. Just plain static content is generated

# Get Started

1. Clone the repository

```
git clone https://github.com/lightzane/angular-mini-docs
```

2. `npm install`
3. `npm run build`

> Open `docs/index.html`

## Write Your Content

Start editing in the markdown files inside `documents` folder.

**sample-1.md**

```md
# Title of the Page

Then write your content here
```

## Generate Your Content

Run command `npm run build` to generate website and stored in `docs` folder.

Then you can open `docs/index.html`

## Page Options

Describes a page's properties. The fields are all optional.

[comment]: <> (Also update `shared/interfaces/*.interface.ts` when updating below table)

| Field            | Description                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `authors`        | A list of authors. Please see [authors](#authors) documentation below                                                       |
| `tags`           | A list of tags for a page that can also used as a grouping                                                                  |
| `published_date` | (date) This will be used to sort order of **pages**. By default, it will sorted out by filename                             |
| `exclude_title`  | (true or **false**) determines whether the title will be excluded in the titles list which is usually displayed on the left |
| `indent`         | (true or **false**) determines whether to add indentation in each paragraph in the content                                  |
| `include_time`   | (true or **false**) determines whether to include the time (from `published_date`) to be displayed in the page              |
| `index`          | (number) determines the sort priority                                                                                       |

## Authors

| Field       | Description                               |
| ----------- | ----------------------------------------- |
| `name`      | (**required**) Name of the author         |
| `title`     | Title of the author                       |
| `image_url` | Profile or display picture for the author |
| `url`       | Author's website address url              |

### Examples

1. [Global Authors](#global-authors)
2. [Single inline Authors](#single-inline-authors)
3. [Multiple inline Authors](#multiple-inline-authors)

#### Global Authors

Names should be written in `documents/authors.yml`

```yaml
lightzane:
  name: Lightzane
  title: Developer
  image_url: https://github.com/lightzane.png
  url: https://github.com/lightzane

john:
  name: John Aguilar
  title: Author
```

`sample-2.md` file

```
---
authors: [lightzane, john]
---

# Title of the Page

Then write your content here
```

#### Single Inline Authors

You can explicitly define Authors within a page

`sample-3.md` file

**Observer proper indentation**

```
---
authors:
  - name: John Smith
    title: Author
---
```

#### Multiple Inline Authors

You can also explicitly write a list of Authors within a page

`sample-4.md` file

```
---
authors:
 - name: John Smith
   title: Author
 - name: Jane Doe
   title: Author/Developer
---
```
