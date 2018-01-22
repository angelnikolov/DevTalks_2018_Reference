var DIGITS = ['edno', 'dve', 'tri', 'chetiri', 'pet', 'shest', 'sedem', 'osem', 'devet'];
var OPERATORS = ['plus', 'minus', 'po'];
var BRACKETS = ['(', ')'];
var GRAMMAR = {
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
    }
};
var lex = function (code) {
    return code.split(' ');
};
var parse = function (tokens) {
    var i = 0;
    var peek = function () {
        return tokens[i];
    };
    var consume = function () {
        return tokens[i++];
    };
    var parseNumber = function () {
        var node = { val: GRAMMAR.DIGITS[consume()], type: 'Number' };
        return node;
    };
    var parseOperator = function () {
        var node = { val: GRAMMAR.OPERATORS[consume()], type: 'Operator' };
        return node;
    };
    var parseSquareRoot = function () {
        var _prev = consume();
        var node = { val: _prev, type: 'SquareRootExpression', subExpression: [] };
        while (peek()) {
            if (_prev === 'koren' && peek() !== 'ot') {
                throw new Error('koren should be followed by ot!');
            }
            else {
                if (peek() === ')') {
                    break;
                }
                else {
                    consume();
                }
                _prev = peek();
                node.subExpression.push(parseExpression());
            }
        }
        return node;
    };
    var parseBracket = function () {
        var node = { val: consume(), type: 'SubExpression', subExpression: [] };
        while (peek()) {
            if (peek() !== ')') {
                node.subExpression.push(parseExpression());
            }
            else {
                consume();
                break;
            }
        }
        return node;
    };
    var parseExpression = function () {
        var token = peek();
        if (DIGITS.indexOf(token) !== -1) {
            return parseNumber();
        }
        else if (OPERATORS.indexOf(token) !== -1) {
            return parseOperator();
        }
        else if (token === '(' || token === ')') {
            return parseBracket();
        }
        else if (token === 'koren') {
            var a = parseSquareRoot();
            console.log(a);
            return a;
        }
        else
            throw new Error('Unrecognized token');
    };
    return parseExpression();
};
var transpiler = function (ast) {
    var transpileNumber = function (ast) { return ast.val; };
    var transpileExpression = function (ast) { return "(" + ast.subExpression.map(transpileNode).join(' ') + ")"; };
    var transpileSquareRootExpression = function (ast) { return "Math.sqrt(" + ast.subExpression[0].val + ")"; };
    var transpileOperator = function (ast) { return ast.val; };
    var transpileNode = function (ast) {
        switch (ast.type) {
            case 'Number':
                return transpileNumber(ast);
            case 'Operator':
                return transpileOperator(ast);
            case 'SubExpression':
                return transpileExpression(ast);
            case 'SquareRootExpression':
                return transpileSquareRootExpression(ast);
        }
    };
    debugger;
    return transpileNode(ast);
};
console.log(transpiler(parse(lex('( ( ( ( ( dve po tri ) plus ( shest po osem ) po ( tri po devet ) ) po osem ) minus shest ) po koren ot devet )'))));
/* transpiles to (((((2 * 3) + (6 * 8) * (3 * 9)) * 8) - 6) * Math.sqrt(9)) */
