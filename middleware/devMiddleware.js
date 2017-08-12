import devMiddleware from 'webpack-dev-middleware'

export default (compiler, opts) => {
  const expressMiddleware = devMiddleware(compiler, opts)

  async function middleware (ctx, next) {
    await expressMiddleware(ctx.req, {
      end: (content) => {
        ctx.body = content
      },
      setHeader: (name, value) => {
        ctx.set(name, value)
      }
    }, next)
  }

  middleware.getFilenameFromUrl = expressMiddleware.getFilenameFromUrl
  middleware.waitUntilValid = expressMiddleware.waitUntilValid
  middleware.invalidate = expressMiddleware.invalidate
  middleware.close = expressMiddleware.close
  middleware.fileSystem = expressMiddleware.fileSystem

  return middleware
}
