# Labenu Music Awards

## Primeiros Passos

* Clonar este repositório
* Executar `npm install` para adicionar as dependências
* Criar um arquivo .env na raiz do projeto e preencher as chaves a seguir com os valores apropriados:
   ```
   DB_HOST = 
   DB_USER = 
   DB_PASSWORD = 
   DB_NAME = 
   JWT_KEY = 
   JWT_EXPIRES_IN = 
   BCRYPT_COST = 
   ```
* Executar `npm run setup` para adicionar as tabelas ao banco de dados (em caso de sucesso, o servidor já estará pronto para receber requisições)
----------------------
# Endpoints

## User Endpoints

## **POST** Sign Up

**Path:** `/user/signup`

**Body:**

```json

```

## **POST** Login

**Path:** `/user/login`

**Body:**

```json

```
---------------------

## Bandas 

## **POST** Register Band

**Path:** `/band/register`

**Headers**
```
authorization: "token de autenticação"
```

**Body:**

```json

```


## **GET** Band By Id or Name

**Path:** `/band`

**Query Param**: id/nome da banda

**Body de Resposta:**

```json

```
---------------------

## Shows

## **POST** Create Show

**Path:** `/show/create`

**Headers**
```
authorization: "token de autenticação"
```

**Body:**

```json

```


## **GET** Show By Day

**Path:** `/show`

**Query Param**: dia (friday, saturday, sunday)

**Body de Resposta:**

```json

```

