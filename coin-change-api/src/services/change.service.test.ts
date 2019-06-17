import { getAvailableChange, getOptimalChangeFor, getChangeFor } from './change.service';

describe('Change helper', () => {
  describe('getAvailableChange', () => {
    it('should return correct array of available change', () => {
      expect(getAvailableChange()).toEqual([
        { coin: 'One Euro', quantity: expect.any(Number) },
        { coin: 'Fifty Cents', quantity: expect.any(Number) },
        { coin: 'Twenty Cents', quantity: expect.any(Number) },
        { coin: 'Ten Cents', quantity: expect.any(Number) },
        { coin: 'Five Cents', quantity: expect.any(Number) },
        { coin: 'Two Cents', quantity: expect.any(Number) },
        { coin: 'One Cent', quantity: expect.any(Number) }
      ]);
    });
  });

  describe('getOptimalChangeFor', () => {
    it('should return empty array when amount = 0', () => {
      expect(getOptimalChangeFor(0)).toEqual([]);
    });
  
    describe('when amount is 115', () => {
      const amount = 115;
  
      it('should return 1.00, 0.10, 0.05', () => {
        expect(getOptimalChangeFor(amount)).toEqual([
          { coin: 'One Euro', quantity: 1 },
          { coin: 'Ten Cents', quantity: 1 },
          { coin: 'Five Cents', quantity: 1 }
        ]);
      });
  
      it('should not return 1.00, 0.10, 0.02x2, 0.01', () => {
        expect(getOptimalChangeFor(amount)).not.toEqual([
          { coin: 'One Euro', quantity: 1 },
          { coin: 'Ten Cents', quantity: 1 },
          { coin: 'Two Cents', quantity: 2 },
          { coin: 'One Cent', quantity: 1 }
        ]);
      });
    });
  
    it('should return 1.00x999999, 0.50, 0.20x2, 0.05, 0.02x2 when amount = 99999999', () => {
      expect(getOptimalChangeFor(99999999)).toEqual([
        { coin: 'One Euro', quantity: 999999 },
        { coin: 'Fifty Cents', quantity: 1 },
        { coin: 'Twenty Cents', quantity: 2 },
        { coin: 'Five Cents', quantity: 1 },
        { coin: 'Two Cents', quantity: 2 },
      ]);
    });
  });

  describe('getChangeFor', () => {
    it('should return empty array when amount = 0', () => {
      expect(getChangeFor(0)).toEqual([]);
    });

    it('should return 1.00, 0.01 when amount = 101', () => {
      expect(getChangeFor(101)).toEqual([
        { coin: 'One Euro', quantity: 1 },
        { coin: 'One Cent', quantity: 1 }
      ]);
    });

    describe('when amount is 1289', () => {
      const amount = 1289;
  
      it('should return 1.00x11, 0.50x3, 0.10x3, 0.05x1, 0.02x2', () => {
        expect(getChangeFor(amount)).toEqual([
          { coin: 'One Euro', quantity: 11 },
          { coin: 'Fifty Cents', quantity: 3 },
          { coin: 'Ten Cents', quantity: 3 },
          { coin: 'Five Cents', quantity: 1 },
          { coin: 'Two Cents', quantity: 2 },
        ]);
      });
  
      it('should not return 1.00x12, 0.50x1, 0.20x1, 0.10x1, 0.05x1, 0.02x2', () => {
        expect(getChangeFor(amount)).not.toEqual([
          { coin: 'One Euro', quantity: 12 },
          { coin: 'Fifty Cents', quantity: 1 },
          { coin: 'Twenty Cents', quantity: 1 },
          { coin: 'Ten Cents', quantity: 1 },
          { coin: 'Five Cents', quantity: 1 },
          { coin: 'Two Cents', quantity: 2 },
        ]);
      });
    });

    it('should return 1.00x11, 0.50x24, 0.10x99, 0.05x200, 0.02x11, 0.01x23 when amount = 4335', () => {
      expect(getChangeFor(4335)).toEqual([
        { coin: 'One Euro', quantity: 11 },
        { coin: 'Fifty Cents', quantity: 24 },
        { coin: 'Ten Cents', quantity: 99 },
        { coin: 'Five Cents', quantity: 200 },
        { coin: 'Two Cents', quantity: 11 },
        { coin: 'One Cent', quantity: 23 }
      ]);
    });

    it('should throw an error when requested amount is more than available', () => {
      expect(() => { getChangeFor(4336) }).toThrow('Insufficient coinage');;
    });
  });
});
