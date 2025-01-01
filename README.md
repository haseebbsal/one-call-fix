

# ONE CALL FIX

**This project is bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).**

## Package Manager

**`pnpm` is used as the package manager.**

To use pnpm you would first need to install it globally using `npm i -g pnpm` command.


## Available Scripts

### `pnpm dev`

Runs the app in the development environment. Hot reload is enabled.

### `pnpm build`

Running this command generates an optimized version of your application for production. For more information about deployment visit this [link](https://nextjs.org/docs/pages/building-your-application/deploying).

### `pnpm start`

Serves the newly created build locally, to test the build before it is pushed to the live server.

## Tech Stack

Following is the tech stack used in the frontend side of things,

- [Typescript](https://www.typescriptlang.org/) `Javascript transpiler for type-safety`
- [Next.js](https://nextjs.org/docs) `A React full-stack framework`
- [TailwindCss](https://tailwindcss.com/) `CSS Framework`

## Libraries

There were around a dozen of minor and major libraries used for the development of this project. Some noticeable libraries being:

- [Next UI](https://nextui.org/docs/guide/introduction) `A Modular UI Framework`
- [Framer Motion](https://www.framer.com/motion/) `Animation`
- [js-cookie](https://www.npmjs.com/package/js-cookie) `Manage Browser Cookies`
- [Eslint](https://eslint.org/) `Code Cleanliness`

## File Structure

The project has been broken down into a single `src` directory which consists of multiple subdirectories.

Following is the general description of the purpose of each file directory and some important individual files:

- `public`
    - It includes all the local **images** used throughout the project.
- `.env file`
    - It includes any secret keys used.
- `src`
    - `_utils`
        - This directory contains the reusable utilities for this application:
            - `config`
                - It contains the configuration of any library or service used that requires any kind of configuration.
            - `constants`
                - This directory contains the immutable variables and constants including the `cookie` names used throughout the project.
            - `helpers`
                - This directory contains all the helper functions, which perform different specific functions, used throughout the app.
            - `enums`
                - Enums directory contains all the typescript enums.
            - `types`
                - It contains all typescript types for functions, parameters, any data or variables used in the app.
    - `components`
        - `common`
            - It contains all the reusable ui components, i.e. **buttons**, **input fields** etc.
        - `modules`
            - It contains all the directories broken down by modules depending on the business requirement.
            - The directories are further broken down into `React Functional Components`, which are, in most cases broken down based on the sections or modules for the UI.
            - It also contains an additional `widgets` directory, for example the **navbar**, **sidebar** etc.
    - `hooks`
        - Functionalities which are extracted from components as react hooks, so that they can be easily re-used and maintained throughout the app.
    - `app`
        - This is a Next.js built-in directory, with a specific purpose.
        - Every directory with a `page.tsx` file inside the `app` directory will serve as a route, for example directory created as `/login/page.tsx` means when a user visits `/login`, it will show the content of the `page.tsx` inside the login dir.
        - There are several other conventions also provided by Next.js here for specific purpose eg: `not-found.tsx` so a user is redirected to not found page, `error-boundary.tsx`, so in case of any internal error a something went wrong page is shown etc.
        - For further information you can visit this [link](https://nextjs.org/docs/app/building-your-application/routing#the-app-router).
    - `services`
        - This directory has been broken down into multiple module-wise files.
        - In this directory all the backend/ external apis are called, managed and handled.
    - `styles`
        - This directory has the general styles for this application, `tailwind` is compiled through here.

