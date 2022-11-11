# POST

## /register/tenant

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

## /register/owner

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

## /update/tenant

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

## /update/owner

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


## /login

用户登录，请求体结构

```json
{
  username: "",
  password: "",
}
```
