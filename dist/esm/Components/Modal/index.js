var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect } from 'react';
// Material UI
import { Modal as MuiModal } from '@mui/material';
export const Modal = (_a) => {
    var { modalState, children } = _a, props = __rest(_a, ["modalState", "children"]);
    const [openState, setOpenState] = useState(false);
    // Open Control
    useEffect(() => {
        if (modalState)
            setOpenState(modalState);
    }, [modalState]);
    return (React.createElement(React.Fragment, null,
        React.createElement(MuiModal, { open: openState, onClose: () => setOpenState(false) },
            React.createElement(React.Fragment, null, children))));
};
//# sourceMappingURL=index.js.map