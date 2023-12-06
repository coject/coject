interface iCojectAction {
    data?: any;
    mode?: string;
    dispatch?: any;
    callBack?: any;
    dataSource?: any;
    apiUrlId?: string;
}
export declare const Request: ({ dataSource, mode, data, apiUrlId, dispatch, callBack }: iCojectAction) => Promise<void>;
export {};
