export type TokenType =
  | 'Whitespace'
  | 'OpeningBracket'
  | 'ClosingBracket'
  | 'OpeningBrace'
  | 'ClosingBrace'
  | 'Colon'
  | 'Comma'
  | 'NumberLiteral'
  | 'StringKey'
  | 'StringLiteral'
  | 'BooleanLiteral'
  | 'NullLiteral';

export type TokenTypeWithLevels =
  | 'Whitespace'
  | 'Bracket0'
  | 'Bracket1'
  | 'Bracket2'
  | 'Brace0'
  | 'Brace1'
  | 'Brace2'
  | 'Colon'
  | 'Comma'
  | 'NumberLiteral'
  | 'StringKey'
  | 'StringLiteral'
  | 'BooleanLiteral'
  | 'NullLiteral';

export type TokenDefinition = {
  regex: RegExp;
  tokenType: TokenType;
};

export type Token = {
  type: TokenTypeWithLevels;
  value: string;
};

const tokenTypes: TokenDefinition[] = [
  { regex: /^\s+/, tokenType: 'Whitespace' },
  { regex: /^[{]/, tokenType: 'OpeningBrace' },
  { regex: /^[}]/, tokenType: 'ClosingBrace' },
  { regex: /^[[]/, tokenType: 'OpeningBracket' },
  { regex: /^[\]]/, tokenType: 'ClosingBracket' },
  { regex: /^:/, tokenType: 'Colon' },
  { regex: /^,/, tokenType: 'Comma' },
  { regex: /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i, tokenType: 'NumberLiteral' },
  { regex: /^"(?:\\.|[^"\\])*"(?=\s*:)/, tokenType: 'StringKey' },
  { regex: /^"(?:\\.|[^"\\])*"/, tokenType: 'StringLiteral' },
  { regex: /^true|^false/, tokenType: 'BooleanLiteral' },
  { regex: /^null/, tokenType: 'NullLiteral' },
];

export function tokenize(input: string): Token[] {
  let braceLevel = 0;
  let bracketLevel = 0;
  const tokens: Token[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    let matched = false;

    for (const tokenType of tokenTypes) {
      const match = input.slice(cursor).match(tokenType.regex);

      if (match) {
        let replacedType = '';
        if (tokenType.tokenType === 'OpeningBracket') {
          replacedType = `Bracket${bracketLevel}`;
          bracketLevel = (bracketLevel + 1) % 3;
        }

        if (tokenType.tokenType === 'ClosingBracket') {
          bracketLevel = (bracketLevel + 2) % 3;
          replacedType = `Bracket${bracketLevel}`;
        }

        if (tokenType.tokenType === 'OpeningBrace') {
          replacedType = `Brace${braceLevel}`;
          braceLevel = (braceLevel + 1) % 3;
        }

        if (tokenType.tokenType === 'ClosingBrace') {
          braceLevel = (braceLevel + 2) % 3;
          replacedType = `Brace${braceLevel}`;
        }

        tokens.push({
          type: (replacedType || tokenType.tokenType) as TokenTypeWithLevels,
          value: match[0],
        });

        cursor += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unexpected character at position ${cursor}`);
    }
  }

  return tokens;
}
