import hotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

export default (compiler, opts) => {
  const expressMiddleware = hotMiddleware(compiler, opts)
  return async (ctx, next) => {
    let stream = new PassThrough()
    // Set ctx.body in the middleware, 
    // otherwise the browser will download a unkown file
    await expressMiddleware(ctx.req, {
      end: stream.end.bind(stream),
      write: content => {
        if (!ctx.body) ctx.body = stream
        return stream.write(content)
      },
      writeHead: (status, headers) => {
        ctx.status = status
        ctx.set(headers)
      }
    }, next)
  }
}
