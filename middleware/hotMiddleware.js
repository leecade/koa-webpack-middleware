import hotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

export default (compiler, opts) => {
  const expressMiddleware = hotMiddleware(compiler, opts)
  return async (ctx, next) => {
    var stream = new PassThrough()
    await expressMiddleware(ctx.req, {
      write: (content) => {
        ctx.body = stream
        stream.write(content)
      },
      writeHead: (status, headers) => {
        ctx.status = status
        ctx.set(headers)
      }
    }, next)
  }
}
