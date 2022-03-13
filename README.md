# Ardus

« Motus mais plus ardu ! »

## Commands

The repository exposes 2 commands defined in the `cmd` folder.

### `cli`

To test the core logic around selecting a mystery word within a dictionary and testing a user input against it.

```bash
go run cmd/cli/cli.go
```

### `server`

To run the server:

```bash
go run cmd/server/server.go
```

If you want specific configurations, you can have a `local.env` file based on the [`example.env`](./example.env) one.

You can have more environment configuration and choose the one you want to use with the `ARDUS_ENVIRONMENT` environment variable (which defaults to `local` if not set):

```bash
ARDUS_ENVIRONMENT="prod" go run cmd/server/server.go
```
