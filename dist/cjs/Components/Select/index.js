"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const react_1 = __importStar(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Request
const Services_1 = require("../../Services");
// Material UI
const material_1 = require("@mui/material");
const Select = (_a) => {
    var { name, dataSource, placeholder, value, customKey, customName, variant, onChange, multiple, required, dispatch } = _a, props = __rest(_a, ["name", "dataSource", "placeholder", "value", "customKey", "customName", "variant", "onChange", "multiple", "required", "dispatch"]);
    const Methods = (0, react_hook_form_1.useFormContext)() || {};
    const [selectedValue, setSelectedValue] = (0, react_1.useState)();
    const [selectData, setSelectData] = (0, react_1.useState)([]);
    const { setValue, control } = (0, react_hook_form_1.useFormContext)() || {};
    const DropdownID = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.uniqueName) ? dataSource.uniqueName : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.name) ? dataSource.name : name;
    // Value
    (0, react_1.useEffect)(() => {
        if (value) {
            setSelectedValue(value);
            control && setValue(name, value);
        }
    }, [value]);
    // Static Data
    (0, react_1.useEffect)(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData) && !!dataSource.staticData.length && !(dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl)) {
            dataSource.staticData.map((Data) => {
                return setSelectData((Prev) => [
                    ...Prev,
                    {
                        id: Data[customKey ? customKey : 'id'],
                        label: Data[customName ? customName : 'label']
                    }
                ]);
            });
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData]);
    // Dynamic Data
    (0, react_1.useEffect)(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl) && !dataSource.staticData) {
            (0, Services_1.Request)({
                dataSource: Object.assign({}, dataSource),
                dispatch,
                callBack: (ResponseData) => {
                    ResponseData.map((Data) => {
                        return setSelectData((Prev) => [
                            ...Prev,
                            {
                                id: Data[customKey ? customKey : 'id'],
                                label: Data[customName ? customName : 'label']
                            }
                        ]);
                    });
                }
            }).then();
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl]);
    // Master Component
    const MuiAutocomplete = () => {
        return (react_1.default.createElement(material_1.Autocomplete, Object.assign({ id: DropdownID, options: selectData, multiple: multiple }, props, { value: !!selectData.length && selectedValue
                ? multiple && !!selectedValue.length
                    ? selectedValue.map((SValue) => selectData.find((option) => option.id === SValue))
                    : multiple
                        ? []
                        : selectData.find((option) => option.id === selectedValue)
                : multiple
                    ? []
                    : null, onChange: (e, newValue) => {
                onChange && onChange(e, newValue, Methods);
                setSelectedValue(multiple ? newValue === null || newValue === void 0 ? void 0 : newValue.map((NValue) => NValue.id) : newValue === null || newValue === void 0 ? void 0 : newValue.id);
                control && setValue(name, multiple ? newValue === null || newValue === void 0 ? void 0 : newValue.map((NValue) => NValue.id) : newValue === null || newValue === void 0 ? void 0 : newValue.id);
            }, renderInput: (params) => react_1.default.createElement(material_1.TextField, Object.assign({}, params, { label: placeholder ? placeholder : 'Select', variant: variant })) })));
    };
    return react_1.default.createElement(react_1.default.Fragment, null, control ? react_1.default.createElement(react_hook_form_1.Controller, { name: name, control: control, rules: { required: required }, render: () => react_1.default.createElement(MuiAutocomplete, null) }) : react_1.default.createElement(MuiAutocomplete, null));
};
exports.Select = Select;
//# sourceMappingURL=index.js.map