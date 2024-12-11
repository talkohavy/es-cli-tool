import { COLORS } from '../../constants/colors.js';
import { TokenTypeWithLevels, tokenize } from './tokenizer.js';

export type ColorTheme = Record<TokenTypeWithLevels, string>;

const defaultTheme: ColorTheme = {
  Whitespace: COLORS.black,
  Brace0: COLORS.yellow,
  Brace1: COLORS.magenta,
  Brace2: COLORS.blue,
  Bracket0: COLORS.yellow,
  Bracket1: COLORS.magenta,
  Bracket2: COLORS.blue,
  Colon: COLORS.black,
  Comma: COLORS.black,
  StringKey: COLORS.cyan,
  StringLiteral: COLORS.green,
  NumberLiteral: COLORS.yellow,
  BooleanLiteral: COLORS.blue,
  NullLiteral: COLORS.bold,
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

  const theme: Record<TokenTypeWithLevels, any> = {
    ...defaultOptions.colors!,
    ...options.colors,
  };

  return tokens.reduce((output, token) => `${output}${theme[token.type]}${token.value}${COLORS.stop}`, '');
}
