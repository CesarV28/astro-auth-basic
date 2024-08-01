# Astro Auth Using AuthJs

## Project Description
Astro Auth Using AuthJs is a template for implementing user authentication in an Astro project. It is designed to be flexible and can be integrated with various authentication providers and databases. Additionally, it utilizes server actions in experimental mode.

## Prerequisites
- Node.js v18.x or later
- pnpm v8.x or later or Node.js v18.x or later

## Installation
```bash
pnpm install
```

## Configuration
1. Create a `.env ` file at the root of the project with the following variables:
```bash
cp .example.env .env
```

2. Edit the `.env` file with the following variables (replace `APP_URL` with your website's URL):
    ```bash
    APP_URL=http://localhost:3000

    AUTH_TRUST_HOST=true
    AUTH_SECRET=secret
    ```

You can use the following command to create the `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

## Running the Project
```bash
pnpm dev
```
### Usage
After starting the development server, visit `http://localhost:4321` in your web browser to see the authentication system in action.

## Database Integration (Optional)
To use a database adapter, configure the `auth.config.ts` file and follow one of these approaches:
 1. Install an ORM (e.g., Prisma or Drizzle)
    - Install Prisma or Drizzle:
        ```bash
        # Drizzle
        pmpm add drizzle-orm @auth/drizzle-adapter
        # Prisma
        pnpm add @prisma/client @auth/prisma-adapter
        ```
    - Configure the ORM and database [Drizzle](https://authjs.dev/getting-started/adapters/drizzle) or [Prisma](https://authjs.dev/getting-started/adapters/prisma)
    - Update the functions in the `src/db` folder to integrate with your database and return the necessary values.
  2. Use Existing Database Functions
    - The `src/db` folder contains predefined functions that need integration with your database.
    - Modify these functions to work with your database and ensure they return the required values.
  3. Schema: Create a database schema using the `src/db/database_schema.sql` file.
Important: tables must follow the same structure as the mockUser object in the `db/user.db.ts` file.
## Additional Modifications
### Extending Interfaces
 - auth.d.ts: Defines the `User` and `Session` interfaces used to extend the AuthJs interfaces. It is used in the `auth.config.ts` file to define authentication, session, and JWT functions.
 - env.d.ts: Defines the `User` and `Locals` interfaces used to extend the Astro interfaces. The `Locals` interfaces are used to define local variables utilized in the `middleware.ts` file and called in the Astro pages.

### auth.config.ts
 - Providers: Defines the authentication providers used on the website. This example uses Credentials, but other providers such as GitHub, Google, Facebook, etc., can be added.
 - Pages: Defines the routes for the authentication and registration pages.
 - Events: Defines functions executed during different AuthJs events.
 - Callbacks: Defines functions executed during different AuthJs events.
   - Session: Defines the session options used on the website and extends the AuthJs session information.
   - JWT: Defines the JWT options used on the website and extends the AuthJs token information.
 - Adapter: Currently, no database adapter is being used, so this section is left empty.