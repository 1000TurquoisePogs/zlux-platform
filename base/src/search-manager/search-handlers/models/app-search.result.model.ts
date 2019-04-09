import {AppEntity} from './app-entity.model'
export class AppSearchResult {
  public entities:AppEntity[];
  public query:string;
  public type:string

  public deserialize(input:any): AppSearchResult {
    this.entities = input.entities || [];
    this.type = input.type || '';
    this.query = input.query || '';
    return this;
  }
}
