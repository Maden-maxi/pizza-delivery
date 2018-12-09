## Tokens

For authentication

### [POST] - /api/tokens

Create token.

*Payload request:*
```json
{
  "email": "emal@asd.com",
  "hash": "sdfsdflk",
  "userId": "id",
  "expires": "timestamp"
}
```

*Response:*
Status 201

```json
{
  "_id": "some id",
  "email": "emal@asd.com",
  "hash": "sdfsdflk",
  "userId": "id",
  "expires": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### [GET] - /api/tokens/${id}

#### Params:
id - number.

*Response:*

Status 200

```json
{
  "_id": "some id",
  "email": "emal@asd.com",
  "hash": "sdfsdflk",
  "userId": "id",
  "expires": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### [PUT] - /api/tokens/${id}

Update details by ID.
#### Params:
id - number.

*Response:*
Status 200

```json
{
  "_id": "some id",
  "email": "emal@asd.com",
  "hash": "sdfsdflk",
  "userId": "id",
  "expires": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### [DELETE] - /api/tokens/${id}

#### Params:
id - number.

*Response:*
Status - 200