const { generateCode} = require('graphql-static-binding')
const { generator } = require('graphql-static-binding/dist/generators/typescript')
const ts = require('typescript')

module.exports = function(content) {
    const binding = generateCode(content, generator)
    let result = ts.transpileModule(binding, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
    return result.outputText
}