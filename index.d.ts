import { Request } from 'request'

interface IRequestProgressOptions {
  throttle?: number,
  delay?: number,
  lengthHeader?: string,
}

declare function requestProgress(request: Request, options: IRequestProgressOptions): Request

export = requestProgress
