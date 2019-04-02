export class WebEntity {
  public title: string;
  public summary: string;
  public href:string;

  public constructor(obj?: any) {
    this.title = (obj && obj.title) || '';
    this.summary = (obj && obj.summary) || '';
    this.href = (obj && obj.href) || '';
  }
  public deserialize(input:any): WebEntity {
    this.title = input.title || '';
    this.summary = input.summary || '';
    this.href = input.href || '';
    return this;
  }
}
