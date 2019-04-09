import {SubsystemEntity} from './subsystem-entity.model'
export class Subsystems {
  public cics:SubsystemEntity[];
  public db2:SubsystemEntity[];
  public ims:SubsystemEntity[];
  public mq:SubsystemEntity[]

  public deserialize(input:any): Subsystems {
    this.cics = input.cics || [];
    this.db2 = input.db2 || [];
    this.ims = input.ims || [];
    this.mq = input.mq || [];
    return this;
  }
}
