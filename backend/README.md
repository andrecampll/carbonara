# Carbonara 🍝🍃
Carbonara is your personal carbon footprint calculator. It's a web application that helps you to calculate your carbon footprint based on your consumption facts such as electricity, transportation, air travel and diet. It helps you to understand how your daily choices impact the environment and provides you with tips on how to reduce your carbon footprint.

Curious? Check out the [live demo](https://carbonara-jet.vercel.app/)!

## Getting Started
## Backend
First, add your .env file using the .env.example as a template.

Install the dependencies:

```bash
cd backend

npm install
# or
yarn install
# or
pnpm
# or
bun
```

Then, run the development server:

```bash
npm run start:dev
# or
yarn start:dev
# or
pnpm start:dev
# or
bun start:dev
```

Open [http://localhost:3333/graphql](http://localhost:3333/graphql) with your browser to see the result.

## Technical Details
Our backend application is built with Node.js, Express, Apollo Server, and Typescript. We divide our application folder using the src directory following the Node.js + GraphQL conventions specially for resolvers and typedefs.

App Structure:
- `src`: Node.js application
- `src/resolvers`: GraphQL resolvers that contains the business logic for each query and mutation
- `src/typedefs`: GraphQL type definitions that contains the schema for each query and mutation

We use the Apollo Server to create a GraphQL server that serves the schema, resolvers, and context. Also, we merge our resolvers and typedefs into single files called `appResolver.ts` and `appTypeDef` thinking about the scalability of the application. Using this strategy, it would be easier to manage many resolvers and typedefs in the future. We also developed some automated tests using Vitest to test the resolvers and the server.

## Queries
- `footprint`: Just a simple query to test the GraphQL server.

## Mutations
- `calculate`: Mutation to calculate the carbon footprint based on the user's consumption facts.

## Tests
We use Vitest to test the resolvers and the server. To run the tests, you can use the following command:

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

We also have the command `test:coverage` to generate the coverage report.

## Contributing

You can contribute to this project by adding new features, fixing bugs, and improving the documentation. Feel free to open a new issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

Made with 💜 by [andrecampll](https://github.com/andrecampll)!
