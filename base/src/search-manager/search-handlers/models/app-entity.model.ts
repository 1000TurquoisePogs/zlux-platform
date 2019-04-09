export class AppEntity {
  public name: string;
  public type: string;
  public appId: string;
  public summary: string;
  public href:string;

  public deserialize(input:any): AppEntity {
    this.name = input.name || '';
    this.type = input.type || '';
    this.appId = input.appId || '';
    this.summary = input.summary || '';
    this.href = input.href || '';
    return this;
  }
}
