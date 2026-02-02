<h1 align="center">Coject</h1>

<p align="center">Promise based HTTP client for the browser and node.js</p>

<p align="center">
    <a href="https://dev.aait.com.sa/"><b>Website</b></a> •
    <a href="https://dev.aait.com.sa/CojectDocumentation/"><b>Documentation</b></a>
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/coject.svg?style=flat-square)](https://www.npmjs.org/package/coject)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod&style=flat-square)](https://gitpod.io/#https://github.com/coject/coject)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=coject&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=coject)
[![npm downloads](https://img.shields.io/npm/dm/coject.svg?style=flat-square)](https://npm-stat.com/charts.html?package=coject)
[![gitter chat](https://img.shields.io/gitter/room/mzabriskie/coject.svg?style=flat-square)](https://gitter.im/mzabriskie/coject)
[![Known Vulnerabilities](https://snyk.io/test/npm/coject/badge.svg)](https://snyk.io/test/npm/coject)

</div>

## Coject v2.0

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
$ npm i @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid @mui/x-date-pickers coject moment coject-hijri react-hook-form react-toastify tss-react axios

// yarn install
$ yarn add @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid @mui/x-date-pickers coject moment coject-hijri react-hook-form react-toastify tss-react axios
```
```html
<!-- Add Font In /public/index.html Head -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
```

### Important
1. Create `.env` File In The Same Directory Where Your `package.json` Is
2. Define The Following Variable `GENERATE_SOURCEMAP=false`

### In React.js:
```js
// Load Input Components
import { Form, Input } from 'coject';

// Use It Inside Component
function FormApp() {
  return (
    <>
      <Form onSubmit={(formData) => console.log(formData)}>
          <Input type="email" name="username" label="Username" />
          <Input type="password" name="password" label="Password" />
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

## ⚠️ Scanner Component (Important Notice)

The **Scanner** component depends on **Asprise ScannerJS**, which has important technical limitations that users must be aware of.

### Requirements

- ScannerJS requires a **native scanner client installation** on the user's machine.
- The setup dialog (**Download / Run / Scan**) appears **only if the scanner client is NOT installed**.
- If the client is already installed, the setup dialog **will not appear again**.
- The presence of `window.scanner` does **not guarantee** that a physical scanner device is available.

### Script Loading (Required)

ScannerJS **must be loaded synchronously** before using the Scanner component.

You must include the following script in your application's `index.html`:

```html
<script src="//cdn.asprise.com/scannerjs/scanner.js"></script>

### Support

Tested in Chrome 74-75, Firefox 66-67, IE 11, Edge 18, Safari 11-12, & Node.js 8-12.