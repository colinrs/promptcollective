// .prettierrc.cjs
//配置文档参考：https://prettier.io/docs/en/options
module.exports = {
  printWidth: 120, // 指定打印机将换行的行长度
  tabWidth: 2, // 指定每个缩进级别的空格数
  useTabs: false, // 指定每个缩进级别的空格数
  semi: true, // 在语句末尾打印分号
  singleQuote: false, // 使用单引号而不是双引号
  quoteProps: "as-needed", // 使用单引号而不是双引号
  /**
     * "as-needed"- 仅在需要时在对象属性周围添加引号。
      "consistent"- 如果对象中至少有一个属性需要引号，则引用所有属性。
      "preserve"- 尊重对象属性中引号的输入使用。
     */
  jsxSingleQuote: false, // 在 JSX 中使用单引号而不是双引号
  trailingComma: "all", // 尽可能以多行逗号分隔的语法结构打印尾随逗号
  bracketSpacing: true, // 在对象文本的方括号之间打印空格
  bracketSameLine: false, // 在对象文本的方括号之间打印空格
  arrowParens: "always", // 将多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）
  requirePragma: false, // 在唯一箭头函数参数两边加上括号
  // stdinFilepath: "", // 指定用于推断要使用的分析器的文件名
  // range-start
  // rangeStart: 0, // 向后到包含所选语句的第一行的开头
  // rangeEnd: 99999, // 转发到所选语句的末尾
  requirePragma: false, // Prettier 可以将自身限制为仅格式化文件顶部包含特殊注释（称为杂注）的文件
  insertPragma: false, // Prettier 可以将自身限制为仅格式化文件顶部包含特殊注释（称为杂注）的文件
  proseWrap: "preserve", // 默认情况下，Prettier 不会更改 markdown 文本中的换行，因为某些服务使用换行敏感的渲染器
  htmlWhitespaceSensitivity: "css", // 默认情况下，Prettier 不会更改 markdown 文本中的换行
  /**
   * css 遵循 CSS 属性的默认值;
   * strict 所有标签周围的空格（或缺少空格）被认为是重要的;
   * ignore 所有标签周围的空格（或缺少空格）被认为是微不足道的
   */
  vueIndentScriptAndStyle: false, // 是否缩进 Vue 文件中的代码和标签
  endOfLine: "lf", // 正确显示行尾, lf 仅换行;crlf 回车符 + 换行符;cr 仅回车符;auto 维护现有的行尾
  singleAttributePerLine: false, // 在 HTML、Vue 和 JSX 中每行强制使用单个属性
  parser: "html", // 指定要使用的分析器
};