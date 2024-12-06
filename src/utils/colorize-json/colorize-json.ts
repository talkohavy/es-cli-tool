import { COLORS } from '../../constants/colors.js';
import { TokenType, tokenize } from './tokenizer.js';

export type ColorTheme = Record<TokenType, string>;

const defaultTheme: ColorTheme = {
  Whitespace: COLORS.black,
  Brace: COLORS.white,
  Bracket: COLORS.black,
  Colon: COLORS.black,
  Comma: COLORS.black,
  StringKey: COLORS.cyan,
  StringLiteral: COLORS.green,
  NumberLiteral: COLORS.yellow,
  BooleanLiteral: COLORS.blue,
  NullLiteral: COLORS.bright,
};

export type ColorizeOptions = {
  colors?: ColorTheme;
  indent?: number;
};

const defaultOptions: ColorizeOptions = {
  colors: defaultTheme,
  indent: 2,
};

export function colorizeJson(jsonStr: string, options: ColorizeOptions = {}) {
  const tokens = tokenize(jsonStr);

  const theme: Record<TokenType, any> = {
    ...defaultOptions.colors!,
    ...options.colors,
  };

  return tokens.reduce((output, token) => `${output}${theme[token.type]}${token.value}${COLORS.stop}`, '');
}
