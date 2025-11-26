# LearningLounge

Structured learning meets real-time community.
Stop studying alone. TutorTalk connects high-quality, step-by-step tutorials with the power of a live, Discord-style chat environment. Master any subject with lessons, quizzes, and instant peer support.

This is a monorepo project.

## Getting Started

To boot up the project for the first time:

1. Start the development environment:

   ```
   pnpm dev
   ```

   This command will start Docker containers and all the apps.

2. Once Docker is up, create the initial migration and migrate the database:

   ```
   pnpm db:init
   ```

3. Open the web app: http://localhost:3000

## Useful Commands

- `pnpm dev`: Start the development environment
- `pnpm build`: Build all packages and apps
- `pnpm check-types`: Run type checking for all packages and apps
- `pnpm db`: Run Prisma commands for the db package
- `pnpm db:reset`: Reset the database and run migrations

## Project Structure

- `apps/`: Contains all the applications
  - `web/`: Next.js web application
  - `worker/`: Node.js worker application
- `packages/`: Contains shared packages
  - `db/`: Database package with Prisma setup
  - `queue/`: Queue package for background jobs
  - `eslint-config/`: Shared ESLint configuration
  - `typescript-config/`: Shared TypeScript configuration

## Adding New Apps or Packages

To add a new app or package to the monorepo, use the following command:

```
create-k4 app <name> [--next | --node]
```
https://github.com/mrwade/create-k4

This will create a new app in the `apps/` directory with the necessary configuration.

## Installing a dependency in a specific workspace (package)

npm - npm install <package-name> -w=<workspace-name>
Yarn - yarn workspace <workspace-name> add <package-name>
pnpm - pnpm add <package-name> --filter <workspace-name>

## Learn More

To learn more about the technologies used in this project:

- [Turborepo](https://turbo.build/repo)
- [pnpm](https://pnpm.io)
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs/)
- [BullMQ](https://docs.bullmq.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)
