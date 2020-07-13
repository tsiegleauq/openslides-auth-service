# OpenSlides authentication service

Service for OpenSlides which handles the authentication of users.

## Installation

<!-- rem: does not work:  No rule to make target 'build'.  Stop. -->
You can setup the whole project by simply running `make build`.

## Production

For production purposes, you can just run the command `make prod`. This ensures that a production image is created and then starts the created image in a docker container.

Now, the server runs and is accessible on port `8000`.

## Development

You can just run the command `make dev`.
<!-- rem: note that its on port 9004 by default -->
<!-- rem: Step 4/13 : COPY auth/package*.json ./ ==> This also copies package-lock.json (if exists). Note sure if this was intended -->
<!-- rem: strange warning, even thoug my user has read and write access. Perhaps docker needs additional permissions? -->
<!-- auth_1         | mkdir: cannot create directory './src/config/keys': Permission denied -->
<!-- auth_1         | chown: cannot access './src/config/keys': No such file or directory -->
<!-- auth_1         | Generating public/private rsa key pair -->
<!-- Saving key "./src/config/keys/rsa-token.key" failed: No such file or directory -->
<!-- Saving key "./src/config/keys/rsa-cookie.key" failed: No such file or directory -->

This command will start the docker container and listens to changes in the `auth/src`-directory. Every time any file has changed, the container restarts and changes are applied immediately.

## Testing

If you want to run all tests, just run the command `make test`.
<!-- rem: tests curretly fail (I did not perform any npm install but stick close to the readme)-->
<!-- test_1         | Test Suites: 1 failed, 1 total -->
<!-- test_1         | Tests:       4 failed, 4 total -->
<!-- test_1         | Snapshots:   0 total -->

## Networks

Docker-containers have to have access to the same network, to communicate with each other.

1. Create a network `foo` in container-1 with service A (called "service-A") under the network-tab

2. Add a network called `container-1_foo` with the property `external: true` in container 2 with service B (called "service-B") under the network-tab

<!-- rem: incomprehensible. Both Service-A and service-B have to have the same network? -->
3. As well service-A has to have the network `foo` under its network-tab as service-B has to have the network `container-1_foo` under its network-tab

4. Now service-A can communicate to service-B by calling `service-B`
