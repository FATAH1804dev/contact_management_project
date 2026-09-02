# Contact API Spec

## Create Contact API

Endpoint: POST /api/contacts

Headers:

- Authorization: token

Request Body:

```json
{
  "firstName": "Jake",
  "lastName": "Smith",
  "email": "jake2211@gmail.com",
  "phone": "783556453"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Jake",
    "lastName": "Smith",
    "email": "jake2211@gmail.com",
    "phone": "783556453"
  }
}
```

Response Body Errors:

```json
{
  "errors": "email format is invalid"
}
```

## Update Contact API

Endpoint: PUT /api/contacts/:id

Headers:

- Authorization: token

Request Body:

```json
{
  "firstName": "Jake",
  "lastName": "Smith",
  "email": "jake2211@gmail.com",
  "phone": "783556453"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Jake",
    "lastName": "Smith",
    "email": "jake2211@gmail.com",
    "phone": "783556453"
  }
}
```

Response Body Errors:

```json
{
  "errors": "email format is invalid"
}
```

## Get Contact API

Endpoint: GET /api/contacts/:id

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Jake",
    "lastName": "Smith",
    "email": "jake2211@gmail.com",
    "phone": "783556453"
  }
}
```

Response Body Errors:

```json
{
  "errors": "contact not found"
}
```

## Search Contact API

Endpoint: GET /api/contacts

Headers:

- Authorization: token

Query Params:

- name: Search by firstName or lastName using like, optional

- email: Search by email using like, optional

- phone: Search by phone using like, optional

- page: Number of page, default "1"

- size: Size data per page, default "10"

Response Body Success:

```json
{
  "data": [
  {
    "id": 1,
    "firstName": "Jake",
    "lastName": "Smith",
    "email": "jake2211@gmail.com",
    "phone": "783556453"
  },
  "data": {
    "id": 2,
    "firstName": "Nuno",
    "lastName": "Audrey",
    "email": "nuno332@gmail.com",
    "phone": "765488733"
  },
  "data": {
    "id": 3,
    "firstName": "William",
    "lastName": "Grey",
    "email": "will765@gmail.com",
    "phone": "779087123"
  }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

Response Body Errors:

```json
{
  "errors": "contact is not found"
}
```

## Remove Contact API

Endpoint: DELETE /api/contacts/:id

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": "ok"
}
```

Response Body Errors:

```json
{
  "errors": "contact is not found"
}
```
