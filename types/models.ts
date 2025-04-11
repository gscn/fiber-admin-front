// frontend/types/models.ts

export interface User {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  Username: string;
  Email: string;
  Password?: string; // Password should be optional in the frontend interface
  RoleID: number;
  Role?: Role;
  Status: string;
}

export interface Role {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  Name: string;
  Permissions?: Permission[];
}

export interface Permission {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  Name: string;
}