import { Role } from "./role.model";

export interface Player {
    [key: string]: any;
    id: string;
    name: string;
    role: Role;
}