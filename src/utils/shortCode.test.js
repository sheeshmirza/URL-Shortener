const shortCode = require('./shortCode');

describe('src -> utils', () => {
    const response = shortCode();
    test('shortCode -> return -> string', () => {
        expect(response).toEqual(expect.any(String));
    });
    test('shortCode -> string length -> 6', () => {
        expect(response.length).toEqual(6);
    });
});