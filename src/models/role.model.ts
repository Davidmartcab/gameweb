export interface Role {
    [key: string]: any;
    name: string;
    description: string;
    icon: string;
    selected?: boolean;
}