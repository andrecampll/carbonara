# Carbonara 🍝🍃
Carbonara is your personal carbon footprint calculator. It's a web application that helps you to calculate your carbon footprint based on your consumption facts such as electricity, transportation, air travel and diet. It helps you to understand how your daily choices impact the environment and provides you with tips on how to reduce your carbon footprint.

Curious? Check out the [live demo](https://carbonara-jet.vercel.app/)!

## Getting Started
## Frontend
Install the dependencies:

```bash
cd frontend

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
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical Details
Our frontend application is built with Next.js 14, Material UI, Tailwind CSS, Typescript and Apollo Client GraphQL. We divide our application folder using the app directory following the latest Next.js conventions specially for layout files and pages. Also, we developed reusable components, custom hooks, and utility functions to improve the code quality and maintainability alongside tests using Vitest and React Testing Library.

App Structure:
- `app`: Next.js application
- `components`: reusable components
- `hooks`: custom hooks
- `data`: reusable types
- `graphql`: GraphQL queries and mutations
- `lib`: utility functions
- `styles`: global styles and theme

## Tests
To run the tests, you can use the following command:

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
