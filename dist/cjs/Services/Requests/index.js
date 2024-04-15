"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.RequestCreation = void 0;
// Axios Middleware
const axios_1 = __importDefault(require("axios"));
// Request Creation
exports.RequestCreation = axios_1.default.create();
// Request
const Request = async ({ dataSource, mode, data, apiUrlId, dispatch, callback }) => {
    let Type, Name, Method, Data, Headers, APIUrl, APIUrlId, DataPath;
    // Default Method
    const DefaultMethod = () => {
        switch (mode?.toLowerCase()) {
            case "render":
                return "get";
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
            Type = "SINGLE";
            APIUrlId = apiUrlId ? apiUrlId : "";
            Name = dataSource?.name ? dataSource.name : "default";
            Headers = dataSource && dataSource[mode]?.headers ? dataSource[mode]?.headers : dataSource?.headers;
            DataPath = dataSource && dataSource[mode]?.dataPath ? dataSource[mode]?.dataPath?.split(".") : dataSource?.dataPath?.split(".");
            APIUrl = (dataSource && dataSource[mode]?.apiUrl) ? dataSource[mode]?.apiUrl || "" : (dataSource?.apiUrl ? dataSource.apiUrl : "");
            Method = dataSource && dataSource[mode]?.method ? dataSource[mode]?.method || "" : dataSource?.method ? dataSource.method : DefaultMethod();
            Data = ((dataSource && dataSource[mode]?.requestData) ? dataSource[mode]?.requestData(data) : (dataSource?.requestData ? dataSource.requestData(data) : (data ? data : {})));
            break;
        default:
            Headers = dataSource?.headers;
            APIUrl = dataSource?.apiUrl || "";
            APIUrlId = apiUrlId ? apiUrlId : "";
            DataPath = dataSource?.dataPath?.split(".");
            Name = dataSource?.name ? dataSource.name : "default";
            Method = dataSource?.method ? dataSource.method : DefaultMethod();
            Data = (dataSource?.requestData ? dataSource.requestData(data) : (data ? data : {}));
            break;
    }
    // Loading State
    dispatch && dispatch({ type: "LOADING", name: Name });
    // Success State
    const SuccessAction = (Response) => {
        let Payload = Response.data;
        if (DataPath) {
            for (let Index = 0; Index < DataPath.length; Index++) {
                Payload = Payload[DataPath[Index]];
            }
        }
        callback && callback(Payload);
        dispatch && dispatch({ type: Type || "SUCCESS", name: Name, payload: mode === "delete" ? {} : Payload });
    };
    // Error State
    const CatchAction = (Error) => {
        dispatch && dispatch({ type: "ERRORS", error: Error.message, name: Name });
    };
    // Request Actions
    if (Method.toLowerCase() === "get" || Method.toLowerCase() === "delete")
        await exports.RequestCreation[Method.toLowerCase()](`${dataSource?.baseUrl ? dataSource?.baseUrl : localStorage?.baseUrl}${APIUrl || ""}${APIUrlId ? "/" + APIUrlId : ""}`, { "headers": Headers })
            .then((Response) => SuccessAction(Response))
            .catch((Error) => CatchAction(Error));
    else
        await exports.RequestCreation[Method.toLowerCase()](`${dataSource?.baseUrl ? dataSource?.baseUrl : localStorage?.baseUrl}${APIUrl || ""}${APIUrlId ? "/" + APIUrlId : ""}`, Data, { "headers": Headers })
            .then((Response) => SuccessAction(Response))
            .catch((Error) => CatchAction(Error));
};
exports.Request = Request;
//# sourceMappingURL=index.js.map