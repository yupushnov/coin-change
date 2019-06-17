import { handleRequest } from './aws.utils'

describe('AWS utils', () => {
  describe('handleRequest', () => {
    it('should call passed function with arguments and return success response', () => {
      const fn = jest.fn((a) => ({ a }));
      const a = 1;

      expect(handleRequest(fn, a)).toEqual({
        statusCode: 200,
        body: JSON.stringify({ a }),
        headers: expect.any(Object)
      });
      expect(fn).toHaveBeenCalledWith(a);
    });

    it('should handle thrown error and return fail response', () => {
      const error = 'Custom error';
      const fn = jest.fn(() => {
        throw Error(error);
      });

      expect(handleRequest(fn)).toEqual({
        statusCode: 400,
        body: JSON.stringify({ error }),
        headers: expect.any(Object)
      });
      expect(fn).toHaveBeenCalled();
    });
  });
});
