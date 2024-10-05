import formatCurrency from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
    it('works with number', () => {
        expect(formatCurrency(2200)).toEqual('22.00')
    });

    it('works with wrapping numbers', () => {
        expect(formatCurrency(2250.90)).toEqual('22.51');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
});