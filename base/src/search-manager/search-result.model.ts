import { Entity } from './entity.model';
import { File } from './file.model';
export class SearchResult {
  public entities?: Entity[];
  public files?:File[];
  public query: string;
  public type: string;

  public deserialize(input:any, query:string, type:string): SearchResult {
    this.query = query;
    this.files = input.files;
    this.type = type;
    this.entities = input.map((instance:any)=>new Entity().deserialize(instance))
    return this;
  }
}
