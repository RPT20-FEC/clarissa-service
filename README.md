# Photo Service

> This is a part of an Airbnb clone project. This photo service displays the property images. 

## Related Projects

  - https://github.com/RPT20-FEC

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

- Use `npm start` to start the server
- `npm run tests` to run the tests

## API

- GET /listings - return JSON object of all listings data

- GET /listings/:id - returns a JSON object of listing data for a specific listing

- POST /listings - creates a new listing

- PUT /listing/:id - updates listing data for the listing with matching listing id

- DELETE /listing/:id - deletes the record from database that belongs to the listing with matching listing id

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 12.16.2
- MongoDB

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

