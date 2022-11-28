import { Role } from '../../common';

export interface UserProfileResponse {
    id: string;
    role: Role;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    isActive: boolean;
    createdAt: Date;
    balance: number;
}
