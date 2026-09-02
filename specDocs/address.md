# Address API Spec

## Create Address API

Endpoint: POST /api/contacts/:contactId/addresses

Headers:

- Authorization: token

Request Body:

```json
{
  "street": "Mango St.",
  "city": "Malang",
  "province": "East Java",
  "country": "Indonesia",
  "postalCode": "76548"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Mango St.",
    "city": "Malang",
    "province": "East Java",
    "country": "Indonesia",
    "postalCode": "76548"
  }
}
```

Response Body Errors:

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint: PUT /api/contacts/:contactId/addresses/:addressId

Headers:

- Authorization: token

Request Body:

```json
{
  "street": "Mango St.",
  "city": "Malang",
  "province": "East Java",
  "country": "Indonesia",
  "postalCode": "76548"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Mango St.",
    "city": "Malang",
    "province": "East Java",
    "country": "Indonesia",
    "postalCode": "76548"
  }
}
```

Response Body Errors:

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoint: GET /api/contacts/:contactId/addresses/:addressId

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Mango St.",
    "city": "Malang",
    "province": "East Java",
    "country": "Indonesia",
    "postalCode": "76548"
  }
}
```

Response Body Errors:

```json
{
  "errors": "Contact is not found"
}
```

## List Addresses API

Endpoint: GET /api/contacts/:contactId/addresses

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "street": "Mango St.",
      "city": "Malang",
      "province": "East Java",
      "country": "Indonesia",
      "postalCode": "76548"
    },
    {
      "id": 1,
      "street": "Apple St.",
      "city": "Bandung",
      "province": "West Java",
      "country": "Indonesia",
      "postalCode": "75644"
    }
  ]
}
```

Response Body Errors:

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint: DELETE /api/contacts/:contactId/addresses/:addressId

Headers:

- Authorization: token

Request Body:

```json
{
  "street": "Mango St.",
  "city": "Malang",
  "province": "East Java",
  "country": "Indonesia",
  "postalCode": "76548"
}
```

Response Body Success:

```json
{
  "data": "ok"
}
```

Response Body Errors:

```json
{
  "errors": "Address is not found"
}
```
