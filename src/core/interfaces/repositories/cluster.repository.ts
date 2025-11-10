import { ClusterEntity } from "@/core/entities/cluster.entity";

export interface IClusterRepository {
 findAll(): Promise<ClusterEntity[]>;
 findById(id: string): Promise<ClusterEntity | null>;
 findByStatus(status: string): Promise<ClusterEntity[]>;
 create(cluster: ClusterEntity): Promise<ClusterEntity>;
 update(id: string, data: Partial<ClusterEntity>): Promise<ClusterEntity>;
 delete(id: string): Promise<void>;
}
