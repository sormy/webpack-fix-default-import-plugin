var FixDefaultImportPlugin = function() {};

// technically Object.assign() could be used instead but it could be unavailable
function cloneExports(source) {
  if (source === null || source === undefined) {
    return undefined;
  }

  var to = {};
  for (var key in source) {
    // Avoid bugs when hasOwnProperty is shadowed
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      to[key] = source[key];
    }
  }
  return to;
};

FixDefaultImportPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation, params) {
    compilation.mainTemplate.plugin('require', function(source, chunk, hash) {
      var newSource = source
        .replace('return module.exports;', '') +
          'if (module.exports && !module.exports.__esModule && module.exports.default === undefined)\n' +
          '  module.exports.default = (' + cloneExports.toString() + ')(module.exports);\n' +
          '\n' +
          'return module.exports;';
      return newSource;
    });
  });
};

module.exports = FixDefaultImportPlugin;
