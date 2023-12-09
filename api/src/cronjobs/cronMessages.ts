export class CronMessages {
  static start(cronName: string){
    return `[START] Started cronjob ${cronName} at ${new Date().toLocaleString()}`
  }

  static executeStart(cronName: string){
    return `[EXECUTE START] Executing cronjob ${cronName} at ${new Date().toLocaleString()}`
  }

  static executeEnd(cronName: string){
    return `[EXECUTE END] Finished executing cronjob ${cronName} at ${new Date().toLocaleString()}`
  }

  static error(cronName: string, error: any){
    return `[ERROR] Error at cronjob ${cronName} at ${new Date().toLocaleString()}. Error Message: ${error}`
  }
}