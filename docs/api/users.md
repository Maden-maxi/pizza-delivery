## User
User can have buyer or seller role.
If user is buyer he can only fill his cart and shop goods.
If user is seller he can same action as user plus create product which will be located in catalog.
Catalog common for all signed up users. Every user can buy products.


### [POST] - /api/users

Create shop.

*Payload request:*
```json
{
  "email": "some_valid@mail.com", // required
  "password": "some password", // required
  "role": "buyer or seller" // required
}
```

*Response:*
Status 201
```json
{
  "_id": "some id",
  "name": "string",
  "address": "string",
  "description": "string",
  "role": "buyer",
  "cart": [],
  "email": "some_valid@mail.com",
  "currency": "$",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### [GET] - /api/users

*Response:*
Status 200

```json
[
    {
        "_id": "some id",
        "name": "string",
        "address": "string",
        "description": "string",
        "role": "buyer",
        "cart": [],
        "email": "some_valid@mail.com",
        "currency": "$",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
]
```

### [GET] - /api/users/${id}

#### Params:
id - number.

*Response:*

Status 200

```json
{
    "_id": "some id",
    "name": "string",
    "address": "string",
    "description": "string",
    "role": "buyer",
    "cart": [],
    "email": "some_valid@mail.com",
    "currency": "$",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

### [PUT] - /api/users/${id}

Update details by ID.
#### Params:
id - number.



*Payload request:*
```json
{
    "name": "string",
    "address": "string",
    "description": "string",
    "currency": "$",
    "cart": []
}
```

*Response:*
Status 200

```json
{
    "_id": "some id",
    "name": "string",
    "address": "string",
    "description": "string",
    "role": "buyer",
    "cart": [],
    "email": "some_valid@mail.com",
    "currency": "$",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

### [DELETE] - /api/users/${id}

Delete by id.
#### Params:
id - number.

*Response:*
Status - 200