# LegatoJS Framework

The Next Clean Code API Framework, dokumentasi ini dibuat dengan bahasa indonesia,
LegatoJS mengusung clean code yang di fasilitasi dengan konsep code splitting,
kelebihan yang ada salah satunya yaitu ada pada middleware nya,
kita tidak perlu lagi meng-import fungsi nya.

decorator `@Controller` telah menyediakan autoload dari setiap Middleware yang dibuat pada kelas `AppMiddleware`,
kemudian kita juga tidak perlu meng-import routing,
karena routing secara otomatis telah dibuat ketika dideklarasikan melalui `@Controller`.

Framework ini dibangun dengan Express sebagai pondasi `routing`, `request`, dan `response`.
yang juga mendukung beberapa database, untuk versi beta ini `legatojs` mensupport database
SQL Server, Postgre SQL, dan MySQL yang difasilitasi oleh [TypeORM](https://typeorm.io/)

untuk penjelasan yang lebih terperinci dan lengkap. silahkan baca dokumentasi dibawah.

## Installasi

- #### install package cli legato

```bash
  npm i -g @legatojs/cli
```

- #### membuat project baru

```bash
  npx lgo new app myApp
  cd myApp
  npm install
```

- #### menjalankan project

```bash
  npm run dev
```

- #### membuild project

```bash
  npm run build
```

- #### menjalankan project dengan environment build

```bash
  npm run start:build
```

- Port default dari LegatoJS adalah 8888, jika ada kebutuhan untuk mengubah Port, anda bisa mengubahnya di `/src/index.ts`

```typescript
import "reflect-metadata";
import Application, { dependency } from "./core/legato/Application";
import { Routes } from "./core/routers/routers";
import cors from "cors";
import express from "express";
import path from "path";

new Application(8888, Routes.autoload(), [
  dependency.use(cors()),
  dependency.use(express.json()),
  dependency.use(express.urlencoded({ extended: true })),
  dependency.use(express.static(path.join(__dirname, "public"))),
]);
```

- jalankan `http:8888/localhost/welcome/message` pada browser, jika routing ini memunculkan sebuah pesan, maka project telah berhasil di install

## Module

> Module berisikan dua file dasar yaitu controller dan service, untuk membuat nya tuliskan perintah

```bash
   npx lgo new module nama_module
```

perintah di atas akan meng-create dua file yaitu controller dan service dalam folder nama_module pada direktori /app :

- Controller - adalah sebuah class untuk manajemen API - umumnya memiliki routing path, middleware dan sebuah response untuk API.
- Service - adalah sebuah class untuk kebutuhan manajemen data static, maupun dengan menggunakan database

## Controller & Service

> ketika pertama kali dibuat menggunakan legato cli maka hasil akan nampak seperti di bawah

### Controller

```typescript
import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import ExampleService from "./example.service";

@Controller({
  basepath: "/example",
})
export default class Example {
  constructor(private exampleService: ExampleService = new ExampleService()) {}
  @Http.Get({
    path: "/",
  })
  PrintMessage(request: Request, response: Response) {
    response.json(this.exampleService.Print());
  }
}
```

### Service

```typescript
import { Postgres, SqlServer, MySQL } from "../../config/database";
import {
  PostgreeContext,
  SqlServerContext,
  TDatabaseRecordResult,
} from "../../core/legato/types/database.types";

export default class ExampleService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL
  ) {}
  Print() {
    return "this is Example service";
  }
}
```

- #### Menggunakan Database Pada Service

```typescript
...
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL
  ) {}
...
```

semua module database di ambil dari /src/config/database.ts

```typescript
import Database from "../core/legato/Database";
export const Postgres = new Database({
  provider: "pgsql",
  options: {
    host: "localhost",
    user: "postgres",
    password: "",
    database: "",
    port: 5432,
  },
});

export const SqlServer = new Database({
  provider: "sqlserver",
  options: {
    server: "",
    user: "",
    password: "",
    database: "",
    parseJson: true,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  },
});

export const MySQL = new Database({
  provider: "mysql",
  options: {
    host: "localhost",
    user: "root",
    password: "",
    database: "",
    port: 3306,
  },
});
```

- #### Menggunakan SQL Server

```typescript
import { Postgres, SqlServer, MySQL } from "../../config/database";
import {
  PostgreeContext,
  SqlServerContext,
  TDatabaseRecordResult,
} from "../../core/legato/types/database.types";

export default class ExampleService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL
  ) {}

  async GetData(Record: TDatabaseRecordResult<SqlServerContext>) {
    const data = await this.mssql
      .query("SELECT * FROM MY_TABLE")
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });

    return data;
  }

  Print() {
    return "this is Example service";
  }
}
```

kemudian pada Controller silahkan panggil fungsi `GetData()`

```typescript
...
@Controller({
  basepath: "/example",
})
export default class Example {
  constructor(private exampleService: ExampleService = new ExampleService()) {}
  @Http.Get({
    path: "/data",
  })
  async getMytable(request: Request, response: Response){
    const service = await this.exampleService.GetData("recordset")
      .then(result => result)
      .catch(error => error)
    response.json(service)
  }
...
}

```

- `TDatabaseRecordResult<context> = Array<keyof context>` - Pembungkus Property Result data
- `SqlServerContext` - Menampung Property dari `SQLServer`
- `PostgreeContext` - Menampung Property dari `PostgreSQL`

### Middleware

middleware adalah sebuah rules untuk request API sebelum request diteruskan kepada Controller

untuk Legato sendiri, Setup untuk Middleware telah disediakan pada direktori `/src/middleware/AppMiddleware.ts`

```typescript
import { NextFunction, Request, Response } from "express";

export default class AppMiddleware {
  auth(request: Request, response: Response, next: NextFunction) {
    console.log("is Auth");
    next();
  }
  logger(request: Request, response: Response, next: NextFunction) {
    console.log(request.hostname);
    next();
  }
}
```

untuk memanggilnya pada Controller cukup dengan menambahkan Property Parameter pada decorator `@Controller`

```typescript
...
  @Controller({
    path: "/example",
    middleware: ["auth"]
  })
...
```

apabila middleware hanya digunakan untuk beberapa routing khusus maka :

```typescript
...
  @Http.Get({
    path: "/helloworld",
    middleware: ["auth"]
  })
  async HelloWorld(request: Request, response: Response){
    ...
  }
...
```

### Extensions

extension pada dasarnya adalah sebuah middleware tambahan pihak ketiga yang memerlukan sebuah parameter untuk integrasinya
sebagai cuntoh adalah middleware `Multer` sebagai middleware untuk menerima request berupa file atau `multipart/formdata` dari API

setup extension tersedia pada direktori `/src/middleware/AppExtensions.ts`

```typescript
import multer from "multer";
import path from "path";

export default abstract class AppExtensions {
  public static Multer = multer({
    dest: path.join(__dirname, "../public/uploads"),
  });
}
```

Untuk memanggilnya ke dalam Routing adalah sebagai berikut :

```typescript
@Http.Post({
    path: "/helloworld",
    middleware: ["auth"],
    extension: [AppExtensions.Multer.single("photo")]
  })
  async UploadPhotos(request: Request, response: Response){
    const file = request.file
    ...
  }
```

### Legato/Typeorm

file setup untuk typeorm ada pada direktori `src/config/typeorm.ts`

```typescript
import { loadEntities } from "../core/typeorm";
import { DataSource } from "typeorm";
import { PerformConnection } from "../core/typeorm";

const Entities = loadEntities(process.cwd() + "/src/entities");

export const PostgresORM = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "",
  password: "",
  database: "",
  synchronize: false,
  port: 5432,
  entities: Entities,
});

export const SQLServerORM = new DataSource({
  type: "mssql",
  host: "localhost",
  username: "",
  password: "",
  database: "",
  synchronize: false,
  pool: {
    max: 10,
    min: 0,
  },
  options: {
    encrypt: false,
  },
  entities: Entities,
});

export const MysqlORM = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "",
  password: "",
  database: "",
  port: 3306,
  synchronize: false,
  entities: Entities,
});

const connection = new PerformConnection(PostgresORM);
connection.connect();
```

Perhatikan pada class `PerformConnection` di bawah, isikan constructornya dengan object dari database, sebagai contoh untuk kasus ini adalah `PostgresORM`

```typescript
...
const connection = new PerformConnection(PostgresORM);
connection.connect();
...
```

ketika membuat koneksi dengan menggunakan `TypeORM`, maka langkah berikutnya adalah membuat entity, untuk membuat entity maka anda harus membuat direktori bernama `entities` di dalam direktori `src`

kita juga dapat melakukan custom pada direktori ini dengan setting sebagai berikut :

```typescript
...
const Entities = loadEntities(process.cwd() + "/src/entities");
...
```

sintaks ini terdapat pada file yang sama, terletak setelah import

pada kasus ini sebagai contoh untuk membuat entity user, silahkan buat file dengan nama `users.entity.ts` pada direktori `entities`

```typescript
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export default class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column()
  name: string;

  @Colum()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

untuk dokumentasi lebih lanjut anda dapat mengunjungi situs official [TypeORM](https://typeorm.io/)

## Implementasi Legato Module dengan TypeORM

`user.service.ts`

```typescript
import { MysqlORM } from "../../config/typeorm";
import UsersEntity from "../../entities/users.entity.ts";

export default class UsersService {
  constructor(private db = MysqlORM) {}

  async getUsers(): Promise<UsersEntity[]> {
    const Repo = this.db.getRepository(UsersEntity);
    return Repo.find();
  }
}
```

`users.controller.ts`

```typescript
import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import UsersService from "./users.service";

@Controller({
  basepath: "/api",
})
export default class Users {
  constructor(private usersService: UsersService = new UsersService()) {}

  @Http.Get({
    path: "/users",
  })
  async GetAllUsers(request: Request, response: Response) {
    const results = await usersService
      .getUsers()
      .then((data) => data)
      .catch((error) => error);

    response.json(results);
  }
}
```

### Demikianlah sedikit penjelasan mengenai integrasi `TypeORM` dengan `Legato Module`

#

## Support

Terimakasih Untuk :

- [Typescript](https://www.typescriptlang.org/)
- [Express JS](https://expressjs.com/)
- [TypeORM](https://typeorm.io)
- [Node MySQL](https://www.npmjs.com/package/mysql2)
- [Node Postgre](https://node-postgres.com/)
- [Node MSSQL](https://www.npmjs.com/package/mssql)
- [npmjs](https://www.npmjs.com/)
