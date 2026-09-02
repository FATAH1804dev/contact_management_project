# User API Spec

## Register User API

Endpoint: POST api/users

Request Body:

```json
{
  "username": "CodeCold",
  "password": "secret",
  "name": "Fathahillah"
}
```

Response Body Succes:

```json
{
  "data": {
    "username": "CodeCold",
    "name": "Fathahillah"
  }
}
```

Response Body Error:

```json
{
  "errors": {
    "message": "username already excist",
    "status": 400
  }
}
```

## Login User API

Endpoint: POST api/users/login

Request Body:

```json
{
  "username": "CodeCold",
  "password": "secret"
}
```

Response Body Succes:

```json
{
  "data": {
    "token": "(unique token per session)"
  }
}
```

Response Body Error:

```json
{
  "errors": {
    "message": "username or password wrong"
  }
}
```

## Update User API

Endpoint: PATCH api/users/current

Headers:

- Authorization: token

Request Body:

```json
{
  "username": "CodeCold",
  "password": "secret"
}
```

Response Body Succes:

```json
{
  "data": {
    "username": "CodeCold",
    "name": "Fathahillah"
  }
}
```

Response Body Error:

```json
{
  "errors": {
    "message": "username length max 30 characters"
  }
}
```

## Get User API

Endpoint: GET api/users/current

Headers:

- Authorization: token

Response Body Succes:

```json
{
  "data": {
    "username": "CodeCold",
    "name": "Fathahillah"
  }
}
```

Response Body Error:

```json
{
  "errors": {
    "message": "unauthorized"
  }
}
```

## Logout User API

Endpoint: DELETE api/users/current

Headers:

- Authorization: token

Response Body Succes:

```json
{
  "data": "Ok"
}
```

Response Body Error:

```json
{
  "errors": {
    "message": "unauthorized"
  }
}
```
