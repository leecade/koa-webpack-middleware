'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (compiler, opts) {
  var expressMiddleware = (0, _webpackDevMiddleware2.default)(compiler, opts);
  return function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return expressMiddleware(ctx.req, {
                end: function end(content) {
                  ctx.body = content;
                },
                setHeader: ctx.set.bind(ctx)
              }, next);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }();
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _stream = require('stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (compiler, opts) {
  var expressMiddleware = (0, _webpackHotMiddleware2.default)(compiler, opts);
  return function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var stream;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // eslint-disable-line
              stream = new _stream.PassThrough();

              ctx.body = stream;
              _context.next = 4;
              return expressMiddleware(ctx.req, {
                write: stream.write.bind(stream),
                writeHead: function writeHead(state, headers) {
                  ctx.state = state;
                  ctx.set(headers);
                }
              }, next);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }();
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hot = exports.dev = undefined;

var _devMiddleware = require('./devMiddleware');

var _devMiddleware2 = _interopRequireDefault(_devMiddleware);

var _hotMiddleware = require('./hotMiddleware');

var _hotMiddleware2 = _interopRequireDefault(_hotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.dev = _devMiddleware2.default;
exports.hot = _hotMiddleware2.default;
