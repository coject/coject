// Axios Middleware
import axios from "axios";
// Request Creation
export const RequestCreation = axios.create();
// Request
export const Request = async ({ dataSource, mode, data, apiUrlId, dispatch, callback }) => {
    let Type, Name, Method, Data, Headers, APIUrl, APIUrlId, DataPath, withCredentials;
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
    withCredentials = dataSource?.withCredentials ?? false;
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
        let errorMessage = Error;
        dispatch && dispatch({ type: "ERRORS", error: errorMessage, name: Name });
        throw errorMessage;
    };
    // Request Actions
    if (Method.toLowerCase() === "get" || Method.toLowerCase() === "delete")
        await RequestCreation[Method.toLowerCase()](`${dataSource?.baseUrl ? dataSource?.baseUrl : localStorage?.baseUrl}${APIUrl || ""}${APIUrlId ? "/" + APIUrlId : ""}`, { "headers": Headers, "withCredentials": withCredentials })
            .then((Response) => SuccessAction(Response))
            .catch((Error) => CatchAction(Error));
    else
        await RequestCreation[Method.toLowerCase()](`${dataSource?.baseUrl ? dataSource?.baseUrl : localStorage?.baseUrl}${APIUrl || ""}${APIUrlId ? "/" + APIUrlId : ""}`, Data, { "headers": Headers, "withCredentials": withCredentials })
            .then((Response) => SuccessAction(Response))
            .catch((Error) => CatchAction(Error));
};
//# sourceMappingURL=index.js.map