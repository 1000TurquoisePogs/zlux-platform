import { WebEntity } from './web-entity.model';
import { File } from './file.model';
import { Subsystems} from './subsystems-search.result.model';
export class SearchResult {
  public entities?: WebEntity[];
  public subsystems?:Subsystems;
  public files?:File[];
  public query: string;
  public type: string;

  public constructor(obj?: any) {
    this.entities = (obj && obj.entities) || [];
    this.subsystems = (obj && obj.subsystems) || [];
    this.files = (obj && obj.entities) || [];
    this.query = (obj && obj.query) || '';
    this.type = (obj && obj.type) || '';

  }

  public deserialize(input:any, query:string, type:string): SearchResult {
    this.query = query;
    this.files = input.files;
    this.type = type;
    this.entities = input.map((instance:any)=>new WebEntity().deserialize(instance))
    return this;
  }
}
