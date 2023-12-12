"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
// Axios Middleware
const axios_1 = __importDefault(require("axios"));
// React Toastify
const react_toastify_1 = require("react-toastify");
// Request
const Request = ({ dataSource, mode, data, apiUrlId, dispatch, callBack }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let Type, Name, Method, Data, Headers, APIUrl, APIUrlId, DataPath;
    // Request With Token
    const Axios = axios_1.default.create();
    // Default Method
    const DefaultMethod = () => {
        switch (mode === null || mode === void 0 ? void 0 : mode.toLowerCase()) {
            case "create":
                return "post";
            case "update":
                return "put";
            case "delete":
                return "delete";
            default:
                return "get";
        }
    };
    // Handling Variables
    switch (mode) {
        case "create":
        case "update":
        case "delete":
            if (((dataSource[mode] && dataSource[mode].formData) || (dataSource === null || dataSource === void 0 ? void 0 : dataSource.formData)) && ((dataSource[mode] && dataSource[mode].requestData) || (dataSource === null || dataSource === void 0 ? void 0 : dataSource.requestData))) {
                if (dataSource[mode] && dataSource[mode].requestData) {
                    for (let Index = 0; Index < Object.keys(dataSource[mode].requestData).length; Index++) {
                        data.append(Object.keys(dataSource[mode].requestData)[Index], dataSource[mode].requestData[Object.keys(dataSource[mode].requestData)[Index]]);
                    }
                }
                else if (dataSource.requestData) {
                    for (let Index = 0; Index < Object.keys(dataSource.requestData).length; Index++) {
                        data.append(Object.keys(dataSource.requestData)[Index], dataSource.requestData[Object.keys(dataSource.requestData)[Index]]);
                    }
                }
            }
            Type = "SINGLE";
            APIUrlId = apiUrlId ? apiUrlId : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrlId) ? dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrlId : "";
            APIUrl = dataSource[mode] && dataSource[mode].apiUrl ? dataSource[mode].apiUrl : dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl;
            Headers = dataSource[mode] && dataSource[mode].headers ? dataSource[mode].headers : dataSource === null || dataSource === void 0 ? void 0 : dataSource.headers;
            DataPath = dataSource[mode] && dataSource[mode].dataPath ? dataSource[mode].dataPath.split(".") : (_a = dataSource === null || dataSource === void 0 ? void 0 : dataSource.dataPath) === null || _a === void 0 ? void 0 : _a.split(".");
            Method = dataSource[mode] && dataSource[mode].method ? dataSource[mode].method : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.method) ? dataSource.method : DefaultMethod();
            Name = dataSource[mode] && dataSource[mode].name ? dataSource[mode].name : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.uniqueName) ? dataSource === null || dataSource === void 0 ? void 0 : dataSource.uniqueName : dataSource === null || dataSource === void 0 ? void 0 : dataSource.name;
            Data = (dataSource[mode] && dataSource[mode].formData) || (dataSource === null || dataSource === void 0 ? void 0 : dataSource.formData)
                ? data
                : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.requestData) && (dataSource === null || dataSource === void 0 ? void 0 : dataSource.requestData) instanceof Array
                    ? [...(data ? data : []), ...(dataSource[mode] && dataSource[mode].requestData ? dataSource[mode].requestData : dataSource.requestData)]
                    : Object.assign(Object.assign({}, data), (dataSource[mode] && dataSource[mode].requestData ? dataSource[mode].requestData : dataSource.requestData));
            break;
        default:
            if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.formData) && (dataSource === null || dataSource === void 0 ? void 0 : dataSource.requestData)) {
                for (let Index = 0; Index < Object.keys(dataSource.requestData).length; Index++) {
                    data.append(Object.keys(dataSource.requestData)[Index], dataSource.requestData[Object.keys(dataSource.requestData)[Index]]);
                }
            }
            APIUrl = dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl;
            Headers = dataSource === null || dataSource === void 0 ? void 0 : dataSource.headers;
            DataPath = (_b = dataSource === null || dataSource === void 0 ? void 0 : dataSource.dataPath) === null || _b === void 0 ? void 0 : _b.split(".");
            Method = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.method) ? dataSource.method : DefaultMethod();
            Name = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.uniqueName) ? dataSource === null || dataSource === void 0 ? void 0 : dataSource.uniqueName : dataSource === null || dataSource === void 0 ? void 0 : dataSource.name;
            Data = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.formData) ? data : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.requestData) && (dataSource === null || dataSource === void 0 ? void 0 : dataSource.requestData) instanceof Array ? [...(data ? data : []), ...dataSource.requestData] : Object.assign(Object.assign({}, data), dataSource.requestData);
            APIUrlId = apiUrlId ? apiUrlId : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrlId) ? dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrlId : "";
            break;
    }
    // Loading State
    dispatch && dispatch({ type: "LOADING", name: Name || "default" });
    // Success State
    const SuccessAction = (Response) => {
        var _a, _b, _c, _d, _e;
        if (!!((_b = (_a = Response.data) === null || _a === void 0 ? void 0 : _a.MESSAGE) === null || _b === void 0 ? void 0 : _b.MESSAGE)) {
            dispatch && dispatch({ type: "ERRORS", error: Response.data.MESSAGE.MESSAGE, name: Name || "default" });
            react_toastify_1.toast.error(Response.data.MESSAGE.MESSAGE, { position: react_toastify_1.toast.POSITION.TOP_RIGHT });
        }
        else {
            let Payload = Response.data;
            if (DataPath) {
                for (let Index = 0; Index < DataPath.length; Index++) {
                    Payload = Payload[DataPath[Index]];
                }
            }
            dispatch && dispatch({ type: Type || "SUCCESS", name: Name || "default", payload: mode === "delete" ? {} : Payload });
            callBack && callBack(Payload);
            (dataSource === null || dataSource === void 0 ? void 0 : dataSource.callBack) && (dataSource === null || dataSource === void 0 ? void 0 : dataSource.callBack(Payload));
            ((_c = dataSource === null || dataSource === void 0 ? void 0 : dataSource.create) === null || _c === void 0 ? void 0 : _c.callBack) && dataSource.create.callBack(Payload);
            ((_d = dataSource === null || dataSource === void 0 ? void 0 : dataSource.update) === null || _d === void 0 ? void 0 : _d.callBack) && dataSource.update.callBack(Payload);
            ((_e = dataSource === null || dataSource === void 0 ? void 0 : dataSource.delete) === null || _e === void 0 ? void 0 : _e.callBack) && dataSource.delete.callBack(Payload);
        }
    };
    // Error State
    const CatchAction = (Error) => {
        dispatch && dispatch({ type: "ERRORS", error: Error.message, name: Name || "default" });
    };
    // Request Actions
    if (Method.toLowerCase() === "get" || Method.toLowerCase() === "delete")
        yield Axios[Method.toLowerCase()](`${(dataSource === null || dataSource === void 0 ? void 0 : dataSource.baseUrl) ? dataSource === null || dataSource === void 0 ? void 0 : dataSource.baseUrl : process.env.REACT_APP_URL}${APIUrl}${APIUrlId ? "/" + APIUrlId : ""}`, { "headers": Headers })
            .then((Response) => SuccessAction(Response))
            .catch((Error) => CatchAction(Error));
    else
        yield Axios[Method.toLowerCase()](`${(dataSource === null || dataSource === void 0 ? void 0 : dataSource.baseUrl) ? dataSource === null || dataSource === void 0 ? void 0 : dataSource.baseUrl : process.env.REACT_APP_URL}${APIUrl}${APIUrlId ? "/" + APIUrlId : ""}`, Data, { "headers": Headers })
            .then((Response) => SuccessAction(Response))
            .catch((Error) => CatchAction(Error));
});
exports.Request = Request;
//# sourceMappingURL=index.js.map