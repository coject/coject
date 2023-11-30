<h1 align="center">Coject</h1>

<p align="center">Promise based HTTP client for the browser and node.js</p>

<p align="center">
    <a href="https://coject.com/"><b>Website</b></a> •
    <a href="https://coject.com/docs/intro"><b>Documentation</b></a>
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/coject.svg?style=flat-square)](https://www.npmjs.org/package/coject)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod&style=flat-square)](https://gitpod.io/#https://github.com/coject/coject)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=coject&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=coject)
[![npm downloads](https://img.shields.io/npm/dm/coject.svg?style=flat-square)](https://npm-stat.com/charts.html?package=coject)
[![gitter chat](https://img.shields.io/gitter/room/mzabriskie/coject.svg?style=flat-square)](https://gitter.im/mzabriskie/coject)
[![Known Vulnerabilities](https://snyk.io/test/npm/coject/badge.svg)](https://snyk.io/test/npm/coject)

</div>

## Coject v1.3

The [Coject](https://coject.com/) library exported as [React.js](https://react.dev/) components.
All Component Is Dependency On [Material UI](https://mui.com/) Library.

### Installation

### Using npm:
```shell
// npm install
$ npm i coject

// yarn install
$ yarn add coject
```

### Dependency npm [For JavaScript/TypeScript Project]:
```shell
// npm install
$ npm i @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid @mui/x-date-pickers @types/moment @types/moment-hijri coject moment moment-hijri react-hook-form react-toastify tss-react

// yarn install
$ yarn add @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid @mui/x-date-pickers @types/moment @types/moment-hijri coject moment moment-hijri react-hook-form react-toastify tss-react
```

### In React.js:
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

### Support

Tested in Chrome 74-75, Firefox 66-67, IE 11, Edge 18, Safari 11-12, & Node.js 8-12.