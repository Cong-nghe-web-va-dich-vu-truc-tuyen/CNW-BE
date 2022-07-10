export declare class Router {
    _registerRouter: (path: any, funct: any[]) => {
        path: any;
        middlewares: any;
        controller: any;
    };
    processRoute: (req: any, res: any, listRoutes: any) => Promise<void>;
    get: (path: any, ...funct: any[]) => void;
    post: (path: any, ...funct: any[]) => void;
    runRouter: (req: any, res: any) => void;
}
