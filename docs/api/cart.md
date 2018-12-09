## Cart

### [GET] - /api/users/${id}/cart

*Response:*
Status 200

```json
[
    {
      "_id": "id",
      "quantity": "11",
      "shop_id": "string",
      "title": "title",
      "description": "string",
      "price": "some password",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
]
```

### [PUT] - /api/users/${id}/cart/${shop_id}/${product_id}

#### Params:
id - number.

*Payload request:*
```json
{
    "quantity": "11"
}
```

*Response:*
Status 200

```json
[
    {
      "_id": "id",
      "quantity": "11",
      "shop_id": "string",
      "title": "title",
      "description": "string",
      "price": "some password",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
]
```

### [DELETE] - /api/users/${id}/cart/${shop_id}/${product_id}

Delete shop by id.
#### Params:
id - number.
shop_id - number.
product_id - number

*Response:*
Status - 200


```json
[
    {
      "_id": "id",
      "quantity": "11",
      "shop_id": "string",
      "title": "title",
      "description": "string",
      "price": "some password",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
]
```