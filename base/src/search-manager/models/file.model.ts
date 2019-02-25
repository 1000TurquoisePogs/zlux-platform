import { Line } from './line.model'
export class File {
  public lines: Line[];
  public name: string;

  public deserialize(input:any): File {
    this.lines = input.lines || [];
    this.name = input.name || '';
    return this;
  }
}
