// Axios Middleware
import axios from "axios";

// Interface
interface iDataSource {
    name?: string;
    headers?: any;
    apiUrl?: string;
    baseUrl?: string;
    requestData?: any;
    dataPath?: string;
    method?: "get" | "post" | "put" | "delete";
    create?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    update?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    delete?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
}

interface iRequest {
    data?: any;
    dispatch?: any;
    callback?: any;
    apiUrlId?: string;
    dataSource?: iDataSource;
    mode?: "render" | "create" | "update" | "delete";
}

// Request Creation
export const RequestCreation: any = axios.create();

// Request
export const Request = async ({ dataSource, mode, data, apiUrlId, dispatch, callback }: iRequest) => {
    let Type: string, Name: string, Method: string, Data: any, Headers: any, APIUrl: string, APIUrlId: string, DataPath: any;

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
        case "create": case "update": case "delete":
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
    const SuccessAction = (Response: any) => {
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
    const CatchAction = (Error: any) => {
        dispatch && dispatch({ type: "ERRORS", error: Error.message, name: Name });
    };

    // Request Actions
    if (Method.toLowerCase() === "get" || Method.toLowerCase() === "delete")
        await RequestCreation[Method.toLowerCase()](`${dataSource?.baseUrl ? dataSource?.baseUrl : process.env.REACT_APP_URL}${APIUrl || ""}${APIUrlId ? "/" + APIUrlId : ""}`, { "headers": Headers })
            .then((Response: any) => SuccessAction(Response))
            .catch((Error: any) => CatchAction(Error));
    else
        await RequestCreation[Method.toLowerCase()](`${dataSource?.baseUrl ? dataSource?.baseUrl : process.env.REACT_APP_URL}${APIUrl || ""}${APIUrlId ? "/" + APIUrlId : ""}`, Data, { "headers": Headers })
            .then((Response: any) => SuccessAction(Response))
            .catch((Error: any) => CatchAction(Error));
};
