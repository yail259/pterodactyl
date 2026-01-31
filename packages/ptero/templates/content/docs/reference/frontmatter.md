---
title: Frontmatter
description: Available frontmatter fields.
section: Reference
order: 3
---

# Frontmatter Reference

You can use the following fields in your markdown frontmatter.

| Field         | Type      | Required | Description                                      |
| :------------ | :-------- | :------- | :----------------------------------------------- |
| `title`       | `string`  | **Yes**  | The title of the page.                           |
| `description` | `string`  | No       | A description for SEO and search.                |
| `section`     | `string`  | **Yes**  | The sidebar section this page belongs to.        |
| `order`       | `number`  | No       | Sort order within the section (lower is higher). |
| `hidden`      | `boolean` | No       | If `true`, hides the page from the sidebar.      |
