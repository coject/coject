"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@mui/material/styles");
const theme = (0, styles_1.createTheme)({
    palette: {
        primary: {
            main: "#556ee6",
            dark: "#3147ad",
            light: "#a6b0cf",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#79829c",
            dark: "#2a3042",
            light: "#f3f3f8",
            contrastText: "#212529"
        }
    },
    typography: {
        fontSize: 13,
        fontFamily: [
            "Poppins",
            "sans-serif"
        ].join(',')
    }
});
exports.default = theme;
//# sourceMappingURL=theme.js.map