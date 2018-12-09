# Products

### [POST] - /api/products

Create shop.

*Payload request:*
```json
{
  "userId": "string", // required
  "title": "title", // required
  "description": "string", // required
  "price": 0 // required
}
```

*Response:*
Status 201

```json
{
  "_id": "id",
  "shopId": "string",
  "title": "title",
  "description": "string",
  "price": "some password",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```


### [GET] - /api/products

Status - 200

*Response:*
```json
[
    {
      "_id": "product id",
      "shopId": "shop id",
      "title": "Product",
      "description": "Some description",
      "price": "123",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
]

```

### [GET] - /api/products/${id}

#### Params:

id - number.

```json
{
    "_id": "product id",
    "shopId": "shop id",
    "title": "Product",
    "description": "Some description",
    "price": "123",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```


### [PUT] - /api/products/${id}

#### Params: 
id - number

Update product.

*Payload request:*
```json
{ 
  "title": "title",
  "description": "string",
  "price": "some password"
}
```

*Response:*
Status 201

```json
{
  "shopId": "string",
  "title": "title",
  "description": "string",
  "price": "some password",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```


### [DELETE] - /api/products/${id}

#### Params:
id - number

*Response:*

Status 200