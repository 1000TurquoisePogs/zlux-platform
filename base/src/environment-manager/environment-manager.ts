/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

export enum OSType {
  Unknown,
  AIX,
  Darwin,
  FreeBSD,
  Linux,
  OpenBSD,
  OS400,
  'OS/390',
  SunOS,
  Windows_NT
}

export enum OSPlatform {
  unknown,
  aix, //can be i-series
  darwin,
  freebsd,
  linux,
  openbsd,
  os390,
  sunos,
  win32
}

export class EnvironmentConstants implements ZLUX.EnvironmentConstants {
  readonly OSPlatform = OSPlatform;
  readonly OSType = OSType;
}

export class EnvironmentManager implements ZLUX.EnvironmentManager {
  private static UnixoidHosts = ['AIX', 'Darwin', 'FreeBSD', 'Linux', 'OpenBSD', 'SunOS'];
  
  constructor(private readonly environmentInfo:ZLUX.EnvironmentInfo, private log: ZLUX.ComponentLogger) {
    this.log.info(`ZLUX backend OS=${JSON.stringify(this.environmentInfo.os)}`);
  }

   public readonly constants:EnvironmentConstants = new EnvironmentConstants();
  
  /* TODO below methods assume agents are always needed and present */
  isHostZOS(): boolean {
    return this.environmentInfo.os.osAgent.type == 'OS/390';
  }

  isHostI(): boolean {
    return this.environmentInfo.os.osAgent.type == 'OS400';
  }

  isHostUnixoid():boolean {
    return EnvironmentManager.UnixoidHosts.indexOf(this.environmentInfo.os.osAgent.type || '') != -1;
  }

  isHostWindows():boolean {
    return this.environmentInfo.os.osAgent.type == 'Windows_NT';
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
