# API

## Table of Contents

  1. [Responses](#responses)
  1. [Systems](#systems)
  1. [Users](#users)
  1. [Customers](#customers)
  1. [Products](#products)
  1. [Transactions](#transactions)


## Responses

Below are a list of the possible responses the server can return.

##### HTTP/1.1 200 OK

##### HTTP/1.1 201 Created

##### HTTP/1.1 202 Accepted

##### HTTP/1.1 401 Unauthorized

##### HTTP/1.1 404 Bad Request

##### HTTP/1.1 403 Forbidden

##### HTTP/1.1 404 Not Found

## Systems

#### GET /api/:system/customers

Returns a list of all customers.

##### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
]
    {
    "_id" : ObjectId("55bde809628df9c714b94e29"),
    "displayname" : "Kristoffer Larsen",
    "rfid" : "U0A00E55D28",
    "accesslevel" : 1,
    "username" : "krisklar",
    "balance" : 65
    }
]
```

## Customers

#### GET /api/:system/customers

Returns a list of all customers.

##### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
]
    {
    "_id" : ObjectId("55bde809628df9c714b94e29"),
    "displayname" : "Kristoffer Larsen",
    "rfid" : "U0A00E55D28",
    "accesslevel" : 1,
    "username" : "krisklar",
    "balance" : 65
    }
]
```

#### GET /api/:system/customers/role/:role

Returns a list of all customers with the corresponding role.

##### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
]
    {
        "_id" : ObjectId("542e87952c9d03b00d48c321"),
        "__v" : 0,
        "active" : true,
        "internalprice" : 20,
        "name" : "Fireball",
        "price" : 20,
        "internalPrice" : 20,
        "type" : "Shot"
    }
]
```

### GET /api/:system/customers/show/:id

Returns the customer with the corresponding id.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : true,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

### GET /api/:system/customers/username/:username

Returns the customer with the corresponding username.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : true,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

### GET /api/:system/customers/name/:name

Returns the customer with the corresponding name.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : true,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```


### GET /api/:system/customers/rfid/:rfid

Returns the customer with the corresponding rfid.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : true,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```


### PUT /api/:system/customers/:id

```json
Accept: application/json
Content-Type: application/json
 
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : false,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

Returns the updated product.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : false,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

### POST /api/:system/customers

```json
Accept: application/json
Content-Type: application/json
 
{
    "active" : false,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

Returns the newly created customer.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : false,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```


## Products

### GET /api/:system/products

Returns a list of all products.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
]
    {
        "_id" : ObjectId("542e87952c9d03b00d48c321"),
        "__v" : 0,
        "active" : true,
        "internalprice" : 20,
        "name" : "Fireball",
        "price" : 20,
        "internalPrice" : 20,
        "type" : "Shot"
    }
]
```

### GET /api/:system/products/all

Returns a list of all products that have field active = true.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
]
    {
        "_id" : ObjectId("542e87952c9d03b00d48c321"),
        "__v" : 0,
        "active" : true,
        "internalprice" : 20,
        "name" : "Fireball",
        "price" : 20,
        "internalPrice" : 20,
        "type" : "Shot"
    }
]
```

### GET /api/:system/products/type/:type

Returns a list of all products with the corresponding type.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
]
    {
        "_id" : ObjectId("542e87952c9d03b00d48c321"),
        "__v" : 0,
        "active" : true,
        "internalprice" : 20,
        "name" : "Fireball",
        "price" : 20,
        "internalPrice" : 20,
        "type" : "Shot"
    }
]
```

### GET /api/:system/products/show/:id

Returns the product with the corresponding id.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : true,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

### PUT /api/:system/products/:id

```json
Accept: application/json
Content-Type: application/json
 
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : false,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

Returns the updated product.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : false,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

### POST /api/:system/products

```json
Accept: application/json
Content-Type: application/json
 
{
    "active" : false,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```

Returns the newly created product.

#### Example response

HTTP/1.1 200 OK 
Content-Type: application/json

```json
{
    "_id" : ObjectId("542e87952c9d03b00d48c321"),
    "__v" : 0,
    "active" : false,
    "internalprice" : 20,
    "name" : "Fireball",
    "price" : 20,
    "internalPrice" : 20,
    "type" : "Shot"
}
```
