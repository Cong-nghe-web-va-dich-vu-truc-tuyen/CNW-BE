export declare class UserController {
    login: (req: any, res: any) => Promise<void>;
    createUser: (req: any, res: any) => Promise<void>;
    createAdmin: (req: any, res: any) => Promise<void>;
    updateProfile: (req: any, res: any) => Promise<void>;
    deleteUser: (req: any, res: any) => Promise<void>;
    getAllUsers: (req: any, res: any) => Promise<void>;
    getUser: (req: any, res: any) => Promise<void>;
    changePassword: (req: any, res: any) => Promise<void>;
    logout: (req: any, res: any) => Promise<void>;
    checkLogin: (req: any, res: any) => Promise<void>;
}
