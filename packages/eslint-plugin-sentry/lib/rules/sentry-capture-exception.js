// 要想创建一个插件的最简单方法是使用 Yeoman 生成器。该生成器将引导你创建插件骨架。
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'try catch 中请使用sentry.captureException 上报错误内容',
      recommended: false,
    },
    messages: {
      missingCaptureException: 'try catch 中请使用sentry.captureException 上报错误内容',
    } 
  },
  create: function(context) {
    return {
      CatchClause: function(node) {
        const catchBlock = node.body;
        const catchBlockStatements = catchBlock.body;
        const hasCaptureException = catchBlockStatements.some(
          (statement) =>
            statement.type === 'ExpressionStatement' &&
            statement.expression.type === 'CallExpression' &&
            statement.expression.callee.type === 'MemberExpression' &&
            statement.expression.callee.object.name === 'Sentry' &&
            statement.expression.callee.property.name === 'captureException'
        );
        if (!hasCaptureException) {
          context.report({
            node: node,
            messageId: 'missingCaptureException',
          });
        }
      }
    }
  }
}