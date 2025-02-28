export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'USER';
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date | null;
    loginCount: number;
    accountBlocked: boolean;
}