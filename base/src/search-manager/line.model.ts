export class Line {
  public line: string;
  public lineNum: number;

  public deserialize(input:any): Line {
    this.line = input.line || '';
    this.lineNum = input.lineNum || -1;
    return this;
  }
}
