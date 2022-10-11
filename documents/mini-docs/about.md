---
authors: [lightzane]
tags: [mini docs, about]
published_date: OCT 9 2022
index: 1
---

# Mini Docs

<p style="text-align: end; font-style: italic">Last Updated: October 11, 2022</p>

<hr>

This app lets you focus on writing your content similar to writing a blog or book.

Focus on writing markdown (`*.md`) files. Use **VSCode** (<a href="https://code.visualstudio.com/" target="_blank">https://code.visualstudio.com/</a>) to have a preview of your writing.

Make sure to enable **Format on Save** to automatically format your `.md` files everytime you save.

No live servers are needed. Just plain static content is generated

<!-- truncate -->

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

- `authors` - A list of authors. Please see **Authors** section below
- `tags` - A list of tags for a page that can also used as a grouping
- `published_date` - (date) This will be used to sort order of **pages**. By default, it will sorted out by filename
- `exclude_title` - (true or **false**) determines whether the title will be excluded in the titles list which is usually displayed on the left
- `indent` - (true or **false**) determines whether to add indentation in each paragraph in the content
- `include_time` - (true or **false**) determines whether to include the time (from **published_date**) to be displayed in the page
- `index` - (number) determines the sort priority

## Authors

- `name` - (**required**) Name of the author
- `title` - Title of the author
- `image_url` - Profile or display picture for the author
- `url` - Author's website address url

# Reference

<a href="https://github.com/lightzane/angular-mini-docs/blob/main/README.md" target="_blank">https://github.com/lightzane/angular-mini-docs/blob/main/README.md</a>
