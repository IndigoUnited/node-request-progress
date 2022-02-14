import { Request } from 'request'

interface IRequestProgressState {
  /**  Overall percent (between 0 to 1) */
  percent: number,
  /** The download speed in bytes/sec */
  speed: number,
  size: {
    /** The total payload size in bytes */
    total: number,
    /** The transferred payload size in bytes */
    transferred: number
  },
  time: {
    /** The total elapsed seconds since the start (3 decimals) */
    elapsed: number,
    /** The remaining seconds to finish (3 decimals) */
    remaining: number
  }
}

interface IRequestProgressOptions {
  throttle?: number,
  delay?: number,
  lengthHeader?: string,
}

declare module 'request' {
  interface Request {
    /**
     * onProgress
     * @param event progress
     * @param listener listener
     * @doc
     * The state is an object that looks like this:
     * 
     * ``` json
     * {
     *     percent: 0.5,               // Overall percent (between 0 to 1)
     *     speed: 554732,              // The download speed in bytes/sec
     *     size: {
     *         total: 90044871,        // The total payload size in bytes
     *         transferred: 27610959   // The transferred payload size in bytes
     *     },
     *     time: {
     *         elapsed: 36.235,        // The total elapsed seconds since the start (3 decimals)
     *         remaining: 81.403       // The remaining seconds to finish (3 decimals)
     *     }
     * }
     * ```
     * 
     */
    on(event: 'progress', listener: (state: IRequestProgressState) => void): this
  }
}


declare function requestProgress(request: Request, options: IRequestProgressOptions): Request


export = requestProgress
