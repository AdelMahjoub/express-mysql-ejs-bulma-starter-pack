const zlib = require('zlib');
module.exports = {
  level: zlib.Z_BEST_COMPRESSION,
  strategy: zlib.Z_DEFAULT_STRATEGY
}