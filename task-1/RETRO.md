## Persistence

For persistence, I chose the **load-once into memory and write-through on changes** approach.

The tasks are loaded from `tasks.json` when the server starts. When a task is created, updated, or deleted, the updated dataset is written back to the file.

I chose this approach because it avoids reading the JSON file on every request, while still keeping the data persistent after server restarts. For a small application, this approach is simple and efficient enough.

## Stretch Features

I implemented three stretch features:

### Filtering

```text
GET /tasks?completed=true
GET /tasks?completed=false
```

Tasks can be filtered based on their `completed` status.

### Search

```text
GET /tasks?search=keyword
```

Tasks can be searched by their title. The search is case-insensitive.

### Pagination

```text
GET /tasks?page=1&limit=10
```

Tasks can be returned in pages using `page` and `limit` query parameters.

## Thinking Questions

### What could go wrong if two requests access the JSON file at nearly the same time?

If two requests read and write the JSON file at nearly the same time, they may both work with an outdated version of the data.

For example, both requests might read the same dataset, make different changes, and then write their results back to the file. The last write could overwrite the previous write, causing one of the changes to be lost.

For this project, I did not implement a solution for concurrent file access because it is a small application.

### What did I get wrong or underestimate in Stage 1?

In Stage 1, I mainly focused on the basic CRUD operations and the initial API structure.

I underestimated how the API could be extended with features such as filtering, search, and pagination. I also initially focused less on how data persistence should work and later had to consider how the in-memory dataset and `tasks.json` should work together.

The Stage 1 design was useful as a starting point, but the later stages showed that API design needs to consider future features and data handling more carefully.
