export class ErrorMessages {
  static NOT_FOUND(model: string){
    return `${model} not found.`
  }

  static ID_NOT_VALID(id: string){
    return `Id ${id} is not valid.`
  }

  static CANNOT_CREATE(model: string){
    return `${model} cannot be created.`
  }

  static CANNOT_UPDATE(model: string){
    return `${model} cannot be updated.`
  }

  static CANNOT_DELETE(model: string){
    return `${model} cannot be deleted.`
  }

  static MAX_DURATION_EXCEEDED(minutes: number){
    return `Maximum appointment duration is ${minutes} minutes.`
  }

  static MIN_DURATION_EXCEEDED(minutes: number){
    return `Minimum appointment duration is ${minutes} minutes.`
  }

  static BROKER_BUSY(name: string){
    return `Broker ${name} is already busy during this timeframe.`
  }

  static INVALID_DATE(){
    return `Invalid date parameters`
  }

  static INVALID_EMAIL_PASSWORD(){
    return `Invalid email or password.`
  }

  static UNAUTHORIZED(){
    return `This requisiton is unauthorized.`
  }

  static ROLE_NOT_ALLOWED(role: string){
    return `The role ${role} is not allowed in this requistion.`
  }
}