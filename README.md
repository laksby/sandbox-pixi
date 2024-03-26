# Sandbox PixiJS

![status](https://github.com/laksby/sandbox-pixi/actions/workflows/gatsby.yml/badge.svg?branch=main)

This repository contains source code for PixiJS sandbox template.

[Link to Preview](https://laksby.github.io/sandbox-pixi/)

## Setup

Clone repository

```bash
# ssh
git clone git@github.com:laksby/sandbox-pixi.git
# https
git clone https://github.com/laksby/sandbox-pixi.git
```

### Authenticate

Create `.npmrc` file in project root directory

Write following content to `.npmrc` file

```text
@laksby:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken={YOUR_GITHUB_TOKEN}
```

**{YOUR_GITHUB_TOKEN}** - your personal access token in GitHub. [Personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

Install dependencies

```bash
npm i
```

Run local dev server

```bash
npm start
```

Navigate to `http://localhost:8000`

## Contribution

Run production build

```bash
npm run build
```

Run tests

```bash
npm test
```

Format code

```bash
npm run format
```

**IMPORTANT!** Project uses [Husky](https://github.com/typicode/husky) for automated code formatting on commit.
