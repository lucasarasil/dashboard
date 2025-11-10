// Supervisor Entity
export interface SupervisorEntity {
 id: string;
 name: string;
 email: string;
 phone: string;
 branches: string[];
 isActive: boolean;
 createdAt: Date;
 updatedAt: Date;
}

export class SupervisorFactory {
 static create(data: Partial<SupervisorEntity>): SupervisorEntity {
  const now = new Date();

  return {
   id: data.id ?? this.generateId(),
   name: data.name ?? "",
   email: data.email ?? "",
   phone: data.phone ?? "",
   branches: data.branches ?? [],
   isActive: data.isActive ?? true,
   createdAt: data.createdAt ?? now,
   updatedAt: data.updatedAt ?? now,
  };
 }

 private static generateId(): string {
  return `SUP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
 }
}

// Leader Entity
export interface LeaderEntity {
 id: string;
 name: string;
 email: string;
 phone: string;
 branch: string;
 supervisorId: string;
 isActive: boolean;
 createdAt: Date;
 updatedAt: Date;
}

export class LeaderFactory {
 static create(data: Partial<LeaderEntity>): LeaderEntity {
  const now = new Date();

  return {
   id: data.id ?? this.generateId(),
   name: data.name ?? "",
   email: data.email ?? "",
   phone: data.phone ?? "",
   branch: data.branch ?? "",
   supervisorId: data.supervisorId ?? "",
   isActive: data.isActive ?? true,
   createdAt: data.createdAt ?? now,
   updatedAt: data.updatedAt ?? now,
  };
 }

 private static generateId(): string {
  return `LED-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
 }
}
