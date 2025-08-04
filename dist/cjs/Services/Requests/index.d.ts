interface iDataSource {
    name?: string;
    headers?: any;
    apiUrl?: string;
    baseUrl?: string;
    requestData?: any;
    dataPath?: string;
    withCredentials?: boolean;
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
export declare const RequestCreation: any;
export declare const Request: ({ dataSource, mode, data, apiUrlId, dispatch, callback }: iRequest) => Promise<void>;
export {};
