export class SubsystemEntity {
  public name: string;
  public subsystemType: string;
  public t: string;

  public deserialize(input:any): SubsystemEntity {
    this.name = input.name || '';
    this.subsystemType = input.subsystemType || '';
    this.t = input.t || '';
    return this;
  }
}
