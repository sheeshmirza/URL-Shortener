const generateQR = require('./generateQR');

describe('src -> utils', () => {
    test('generateQR -> return -> string', async () => {
        const response = await generateQR('http://www.google.com');
        expect(response).toEqual(expect.any(String));
    });
});