var FixDefaultImportPlugin = function() {};

// inject "default" with exception to "axios/defaults.js"
// see: https://github.com/sormy/webpack-fix-default-import-plugin/issues/1
var fixModuleExports = function (module) {
  if (module.exports
    && !module.exports.__esModule
    && module.exports.default === undefined
  ) {
    if (module.exports.headers
      && module.exports.headers.common
      && module.exports.headers.common.Accept
      && module.exports.adapter
      && module.exports.transformRequest
      && module.exports.transformResponse
    ) {
      return;
    }
    module.exports.default = module.exports;
  }
}

FixDefaultImportPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation, params) {
    compilation.mainTemplate.plugin('require', function(source, chunk, hash) {
      var newSource = source
        .replace('return module.exports;', '') +
          '(' + fixModuleExports.toString() + ')(module);\n' +
          'return module.exports;';
      return newSource;
    });
  });
};

module.exports = FixDefaultImportPlugin;
