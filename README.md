<h1 align="center">Coject</h1>

<p align="center">Promise based HTTP client for the browser and node.js</p>

<p align="center">
    <a href="https://coject.com/"><b>Website</b></a> •
    <a href="https://coject.com/docs/intro"><b>Documentation</b></a>
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/axios.svg?style=flat-square)](https://www.npmjs.org/package/axios)
[![CDNJS](https://img.shields.io/cdnjs/v/axios.svg?style=flat-square)](https://cdnjs.com/libraries/axios)
[![Build status](https://img.shields.io/github/actions/workflow/status/axios/axios/ci.yml?branch=v1.x&label=CI&logo=github&style=flat-square)](https://github.com/axios/axios/actions/workflows/ci.yml)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod&style=flat-square)](https://gitpod.io/#https://github.com/axios/axios)
[![code coverage](https://img.shields.io/coveralls/mzabriskie/axios.svg?style=flat-square)](https://coveralls.io/r/mzabriskie/axios)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=axios&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=axios)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/axios?style=flat-square)](https://bundlephobia.com/package/axios@latest)
[![npm downloads](https://img.shields.io/npm/dm/axios.svg?style=flat-square)](https://npm-stat.com/charts.html?package=axios)
[![gitter chat](https://img.shields.io/gitter/room/mzabriskie/axios.svg?style=flat-square)](https://gitter.im/mzabriskie/axios)
[![code helpers](https://www.codetriage.com/axios/axios/badges/users.svg)](https://www.codetriage.com/axios/axios)
[![Known Vulnerabilities](https://snyk.io/test/npm/axios/badge.svg)](https://snyk.io/test/npm/axios)

</div>

# Coject v1.2

The [Coject](https://coject.com/) library exported as [React.js](https://react.dev/) components.
All Component Is Dependency On [Material UI](https://mui.com/) Library.

## Installation

Using npm:
```shell
// npm install
$ npm i coject

// yarn install
$ yarn add coject
```

Dependency npm [For JavaScript/TypeScript Project]:
```shell
// npm install
$ npm i @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid @mui/x-date-pickers @types/moment @types/moment-hijri coject moment moment-hijri react-hook-form react-toastify tss-react

// yarn install
$ yarn add @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid @mui/x-date-pickers @types/moment @types/moment-hijri coject moment moment-hijri react-hook-form react-toastify tss-react
```

In React.js:
```js
// Load Input Components
import { Form, Input } from 'coject';

// Use It Inside Component
function FormApp() {
  return (
    <>
      <Form onSubmit={(formData) => console.log(formData)}>
          <Input type="email" name="username" lable="Username" />
          <Input type="password" name="password" lable="Password" />
      </Form>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

See the [package source](https://github.com/coject/coject) for more details.

**Note:**<br>
Install [Material UI](https://www.npmjs.com/package/n_) for Coject use in the React.js > 16.

## Support

Tested in Chrome 74-75, Firefox 66-67, IE 11, Edge 18, Safari 11-12, & Node.js 8-12.