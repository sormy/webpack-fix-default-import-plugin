var FixDefaultImportPlugin = function() {};

FixDefaultImportPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation, params) {
    compilation.mainTemplate.plugin('require', function(source, chunk, hash) {
      var newSource = source
        .replace('return module.exports;', '') +
          'if (module.exports && !module.exports.__esModule && module.exports.default === undefined)\n' +
          '  module.exports.default = module.exports;\n' +
          '\n' +
          'return module.exports;';
      return newSource;
    });
  });
};

module.exports = FixDefaultImportPlugin;
