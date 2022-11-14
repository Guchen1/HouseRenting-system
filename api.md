# API文档

## POST

### /register/tenant

租客注册，请求体结构

```json
{
  name: "",
  address: "",
  sex: "",
  phone: "",
  birth: "",
  username: "",
  password: "",
}
```

返回结构

### /register/owner

业主注册，请求体结构

```json
{
  name: "",
  address: "",
  phone: "",
  username: "",
  password: "",
}
```

返回结构

### /tenant/update

租客信息更新，请求体结构

```json
{
  name: "",
  address: "",
  sex: "",
  phone: "",
  birth: "",
  username: "",
  password: "",
}
```

返回结构

### /owner/update

业主信息更新，请求体结构

```json
{
  name: "",
  address: "",
  phone: "",
  username: "",
  password: "",
}
```

返回结构

### /login

用户登录，请求体结构

```json
{
  username: "",
  password: "",
}
```

返回结构

### /owner/houseinfo

1.参数op为1，添加房屋信息，请求体结构

```json
{
  name: "",
  address: "",
  total: 0,
  rent: 0,
  price: 0,
  description: "",
}
```

返回结构

2.参数op为2，更新房屋信息，请求体结构

```json
{
  id: "",
  name: "",
  address: "",
  total: 0,
  rent: 0,
  price: 0,
  description: "",
}
```

返回结构

## GET

### /owner/houseinfo

1.参数为id，需要返回某个房屋信息

返回结构

```json
{
  name: "",
  address: "",
  total: 0,
  rent: 0,
  price: 0,
  description: "",
}
```

2.无参数，需要返回此业主的所有房屋信息

返回结构
  
  ```json
  [
    {
      id: "",
      name: "",
      address: "",
      total: 0,
      rent: 0,
      price: 0,
      description: "",
    },
    {
      id: "",
      name: "",
      address: "",
      total: 0,
      rent: 0,
      price: 0,
      description: "",
    },
  ]
  ```
