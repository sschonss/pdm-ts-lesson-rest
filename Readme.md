# REST Example using Axios

Video (PT-BR): [https://www.youtube.com/watch?v=pewHnJfl_Y4](https://www.youtube.com/watch?v=pewHnJfl_Y4)

## Setup API

This project uses PocketBase Rest API.

1. Download PocketBase from [https://pocketbase.io/](https://pocketbase.io/)

2. Extract it to any empty folder

3. Execute (on linux) with: `./pocketbase serve`

4. Access the admin page: [http://127.0.0.1:8090/\_/](http://127.0.0.1:8090/_/)

5. On pocketbase ui, create a user: `fulano` with password `pdm123pdm`

6. Create a collection named `cars` with the following fields:

```
brand: string (Plain Text on pocketbase);
model: string (Plain Text on pocketbase);
hp: number;
```

7. Using the pocketbase ui, add some records to the `cars` collection.

8. Setup all collection Api Rules (the gear icon on top header) to `@request.auth.id != ""`

## Setup App

This app is pre-configured to run using Android Emulator on linux. You can update it as needed:

1. Open the file [src/servies/api.ts](src/servies/api.ts)

2. Uncomment (or edit) `baseUrl` according to your use case

## Lazy?

There's a pre-configured pocketbase instance in [pocketbase/](pocketbase/) folder. Unpack an run it. Admin login is admin@example.com, password is 123123123123.
