## Resource

`tasks`

Each task has:

* `id`
* `title`
* `completed`
* `createdAt`

## REST Endpoints

| Method | Path         | Purpose                | Success       | Failure           |
| ------ | ------------ | ---------------------- | ------------- | ----------------- |
| GET    | `/tasks`     | Get all tasks          | `200 OK`      | —                 |
| GET    | `/tasks/:id` | Get a task by ID       | `200 OK`      | `404 Not Found`   |
| POST   | `/tasks`     | Create a new task      | `201 Created` | `400 Bad Request` |
| PUT    | `/tasks/:id` | Update a task          | `200 OK`      | `404 Not Found`   |
| PATCH  | `/tasks/:id` | Toggle task completion | `200 OK`      | `404 Not Found`   |
| DELETE | `/tasks/:id` | Delete a task          | `200 OK`      | `404 Not Found`   |

## Folder Structure

```text
.
├── data/
│   └── tasks.json
├── router/
│   └── tasks/
│       └── index.js
├── upload/
├── utils/
│   └── task.util.js
└── index.js
```

## Why This Structure?

* `router/` contains the task routes and handles API endpoints.
* `data/` contains the JSON file used for storing tasks.
* `utils/` contains reusable functions for loading and saving tasks.
* `upload/` is used for uploaded files.
* `index.js` is the main application entry point.

The logic is kept inside the task router because this project is small and currently does not require a separate controller layer.


## Thinking Questions

### Why might you split "routes" from "controllers" instead of writing logic directly in the route file?

Separating routes from controllers makes the code more organized and easier to maintain.

The `routes` define the API endpoints and HTTP methods, while the `controllers` contain the actual application logic.

This separation becomes more useful as the project grows because route files can become large and difficult to manage if all the logic is written directly inside them.

For this small project, keeping the logic directly in the route file is still reasonable.

### If someone requests a task that doesn't exist, what should happen?

The API should return:

```text
404 Not Found
```

The `404` status code means that the requested resource could not be found.

Returning `200 OK` would be incorrect because `200` indicates that the request was successfully processed and the requested resource was found. Since the requested task does not exist, `404 Not Found` more accurately represents the result.
