const GRAMMAR = {
    DIGITS: {
        'edno': 1,
        'dve': 2,
        'tri': 3,
        'chetiri': 4,
        'pet': 5,
        'shest': 6,
        'sedem': 7,
        'osem': 8,
        'devet': 9
    },
    OPERATORS: {
        'plus': '+',
        'minus': '-',
        'po': '*'
    },
    BRACKETS: ['(', ')'],
    SQUARE_ROOT: ['koren', 'ot']
}

const RESERVED_KEYWORDS = ['klass'];
const lex = (code) => {
    return code.split(' ');
}
type ASTNode = {
    type: string,
    val: any,
    subExpression?: Array<ASTNode>
}

// ["(", "(", "(", "dve"]
const parse = (tokens: Array<string>): ASTNode => {
    let i = 0;
    const peek = () => {
        return tokens[i];
    }

    const consume = () => {
        return tokens[i++];
    }

    const parseNumber = () => {
        const node: ASTNode = {
            val: GRAMMAR.DIGITS[consume()],
            type: 'Number'
        }
        return node;
    }

    const parseOperator = () => {
        const node: ASTNode = {
            val: GRAMMAR.OPERATORS[consume()],
            type: 'Operator'
        }
        return node;
    }

    const parseBracket = () => {
        const node: ASTNode = {
            val: consume(),
            type: 'SubExpression',
            subExpression: []
        };
        while (peek()) {
            if (peek() !== ')') {
                node.subExpression.push(parseExpression())
            }
            else {
                consume();
                break;
            }
        }
        return node;
    }
    //koren ot devet => Math.sqrt(9)
    const parseSquareRoot = () => {
        let _prev = consume();
        const node: ASTNode = { val: _prev, type: 'SquareRootExpression', subExpression: [] };
        while (peek()) {
            console.log(peek());
            if (_prev === 'koren' && peek() !== 'ot') {
                throw new Error('Koren should always be followed by OT')
            }
            else if (_prev === 'ot' && !GRAMMAR.DIGITS[peek()]) {
                throw new Error('Please specify a number after Koren OT')
            }
            else {
                consume();
                node.subExpression.push(parseExpression());
                break;
            }
        }
        return node;
    }
    const parseExpression = () => {
        const token = peek();
        if (RESERVED_KEYWORDS.indexOf(token) !== -1) {
            throw new Error(`You used ${token} which is a reserved keyword`);
        }
        if (GRAMMAR.DIGITS[token]) {
            return parseNumber();
        }
        else if (GRAMMAR.OPERATORS[token]) {
            return parseOperator();
        }
        else if (GRAMMAR.BRACKETS.indexOf(token) !== -1) {
            return parseBracket();
        }
        else if (GRAMMAR.SQUARE_ROOT.indexOf(token) !== -1) {
            return parseSquareRoot();
        }
        else throw new Error('Unrecognized Token')
    }
    return parseExpression();
}

const transpile = (node: ASTNode): string => {
    const transpileNumber = (ast: ASTNode) => ast.val;
    const transpileOperator = (ast: ASTNode) => ast.val;
    const transpileExpression = (ast: ASTNode) => `(${ast.subExpression.map(transpileNode).join(' ')})`;
    const transpileSquareRootExpression = (ast: ASTNode) => `Math.sqrt(${ast.subExpression[0].val})`;
    const transpileNode = (ast: ASTNode) => {
        switch (ast.type) {
            case 'Number':
                return transpileNumber(ast);
            case 'Operator':
                return transpileOperator(ast);
            case 'SubExpression':
                return transpileExpression(ast);
            case 'SquareRootExpression':
                return transpileSquareRootExpression(ast);
            default:
                break;
        }
    }
    return transpileNode(node);
}
console.log((transpile(parse(lex('( ( ( ( ( dve po tri ) plus ( shest po osem ) po ( tri po devet ) ) po osem ) minus shest ) po koren ot devet )')))))
// interpret(parse(lex('( ( ( ( ( dve po tri ) plus ( shest po osem ) po ( tri po devet ) ) po osem ) minus shest ) po koren ot devet )')))
// transpileToDotNet(parse(lex('( ( ( ( ( dve po tri ) plus ( shest po osem ) po ( tri po devet ) ) po osem ) minus shest ) po koren ot devet )')))
// '( ( ( ( ( dve po tri ) plus ( shest po osem ) po ( tri po devet ) ) po osem ) minus shest ) po koren ot devet )'
//     ===>>>
//     '(((((2 * 3) + (6 * 8) * (3 * 9)) * 8) - 6) * Math.sqrt(9))'            