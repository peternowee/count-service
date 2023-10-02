# count-service

Microservice returning the count of triples

## Getting started

### Adding the service to your stack

Add the following snippet to your `docker-compose.yml` to include this
service in your project.

```yaml
version: '3.4'

services:
  count:
    build: https://github.com/peternowee/count-service.git#v0.2.1
    links:
      - database:database
```

Add rules to `dispatcher.ex` to dispatch requests to the static file
service.

E.g.
```elixir
  match "/count/*path" do
    Proxy.forward conn, path, "http://count/count/"
  end
```

Run `docker-compose up` and the service should be reachable through the
dispatcher, for example at http://localhost/count/ .

## Development

For a more detailed look in how to develop a microservice based on the
[mu-javascript-template](https://github.com/mu-semtech/mu-javascript-template),
we would recommend reading "[Developing with the
template](https://github.com/mu-semtech/mu-javascript-template#developing-with-the-template)".

### Developing in the `mu.semte.ch` stack

Paste the following snippet in your `docker-compose.override.yml`,
replacing `../count-service/` with an absolute or relative path
pointing to your local sources:

```yaml
version: '3.4'

services:
  count:
    ports:
      - "8888:80"
      - "9229:9229"
    environment:
      NODE_ENV: "development"
    volumes:
      - ../count-service/:/app/
```
