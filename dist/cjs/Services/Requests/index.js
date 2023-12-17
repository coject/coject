"use strict";
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
const Request = async ({ dataSource, mode, data, apiUrlId, dispatch, callBack }) => {
    let Type, Name, Method, Data, Headers, APIUrl, APIUrlId, DataPath;
    // Request With Token
    const Axios = axios_1.default.create();
    // Default Method
    const DefaultMethod = () => {
        switch (mode?.toLowerCase()) {
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
            if (((dataSource[mode] && dataSource[mode].formData) || dataSource?.formData) && ((dataSource[mode] && dataSource[mode].requestData) || dataSource?.requestData)) {
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
            APIUrlId = apiUrlId ? apiUrlId : dataSource?.apiUrlId ? dataSource?.apiUrlId : "";
            APIUrl = dataSource[mode] && dataSource[mode].apiUrl ? dataSource[mode].apiUrl : dataSource?.apiUrl;
            Headers = dataSource[mode] && dataSource[mode].headers ? dataSource[mode].headers : dataSource?.headers;
            DataPath = dataSource[mode] && dataSource[mode].dataPath ? dataSource[mode].dataPath.split(".") : dataSource?.dataPath?.split(".");
            Method = dataSource[mode] && dataSource[mode].method ? dataSource[mode].method : dataSource?.method ? dataSource.method : DefaultMethod();
            Name = dataSource[mode] && dataSource[mode].name ? dataSource[mode].name : dataSource?.uniqueName ? dataSource?.uniqueName : dataSource?.name;
            Data = (dataSource[mode] && dataSource[mode].formData) || dataSource?.formData
                ? data
                : dataSource?.requestData && dataSource?.requestData instanceof Array
                    ? [...(data ? data : []), ...(dataSource[mode] && dataSource[mode].requestData ? dataSource[mode].requestData : dataSource.requestData)]
                    : { ...data, ...(dataSource[mode] && dataSource[mode].requestData ? dataSource[mode].requestData : dataSource.requestData) };
            break;
        default:
            if (dataSource?.formData && dataSource?.requestData) {
                for (let Index = 0; Index < Object.keys(dataSource.requestData).length; Index++) {
                    data.append(Object.keys(dataSource.requestData)[Index], dataSource.requestData[Object.keys(dataSource.requestData)[Index]]);
                }
            }
            APIUrl = dataSource?.apiUrl;
            Headers = dataSource?.headers;
            DataPath = dataSource?.dataPath?.split(".");
            Method = dataSource?.method ? dataSource.method : DefaultMethod();
            Name = dataSource?.uniqueName ? dataSource?.uniqueName : dataSource?.name;
            Data = dataSource?.formData ? data : dataSource?.requestData && dataSource?.requestData instanceof Array ? [...(data ? data : []), ...dataSource.requestData] : { ...data, ...dataSource.requestData };
            APIUrlId = apiUrlId ? apiUrlId : dataSource?.apiUrlId ? dataSource?.apiUrlId : "";
            break;
    }
    // Loading State
    dispatch && dispatch({ type: "LOADING", name: Name || "default" });
    // Success State
    const SuccessAction = (Response) => {
        if (!!Response.data?.MESSAGE?.MESSAGE) {
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
            dataSource?.callBack && dataSource?.callBack(Payload);
            dataSource?.create?.callBack && dataSource.create.callBack(Payload);
            dataSource?.update?.callBack && dataSource.update.callBack(Payload);
            dataSource?.delete?.callBack && dataSource.delete.callBack(Payload);
        }
    };
    // Error State
    const CatchAction = (Error) => {
        dispatch && dispatch({ type: "ERRORS", error: Error.message, name: Name || "default" });
    };
    // Request Actions
    if (Method.toLowerCase() === "get" || Method.toLowerCase() === "delete")
        await Axios[Method.toLowerCase()](`${dataSource?.baseUrl ? dataSource?.baseUrl : process.env.REACT_APP_URL}${APIUrl}${APIUrlId ? "/" + APIUrlId : ""}`, { "headers": Headers })
            .then((Response) => SuccessAction(Response))
            .catch((Error) => CatchAction(Error));
    else
        await Axios[Method.toLowerCase()](`${dataSource?.baseUrl ? dataSource?.baseUrl : process.env.REACT_APP_URL}${APIUrl}${APIUrlId ? "/" + APIUrlId : ""}`, Data, { "headers": Headers })
            .then((Response) => SuccessAction(Response))
            .catch((Error) => CatchAction(Error));
};
exports.Request = Request;
//# sourceMappingURL=index.js.map