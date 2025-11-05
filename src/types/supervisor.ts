import { Leader } from "./leader";
export interface Supervisor {
 id: string;
 nome: string;
 lideres: Leader[];
}
