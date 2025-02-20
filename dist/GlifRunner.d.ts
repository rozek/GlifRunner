export type GlifInputs = string[] | {
    [Key: string]: string;
};
/**** GlifRunner - runs a given Glif ****/
export declare class GlifRunner {
    private _APIToken;
    /**** constructor - allows to configure a specific Glif API token ****/
    constructor(APIToken?: string);
    /**** isRunning, abort - useful, if Glifs are running in the background ****/
    private _AbortController;
    get isRunning(): boolean;
    set isRunning(_: boolean);
    abort(): void;
    /**** Response - access Glif output whenever you want ****/
    private _Response;
    get Response(): object | undefined;
    set Response(_: object | undefined);
    /**** run - run a given Glif and grab its result ****/
    run(GlifId: string, InputValues?: GlifInputs, Callback?: Function): Promise<object>;
    /**** static APIToken - allows to configure a "global" API token ****/
    private static _APIToken;
    static get APIToken(): string | undefined;
    static set APIToken(APIToken: string | undefined);
    /**** static run - convenience method for simple GlifRunner invocations ****/
    static run(GlifId: string, InputValues: GlifInputs, Callback?: Function): Promise<object>;
}
