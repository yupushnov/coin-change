import { Change, CoinName, Coins, Coin } from '../models/change.model'
import { isInputAmountValid, getCoinsQuantity, getAvailableCoinsQuantity } from './money.utils'

describe('Money utils', () => {
  describe('validateInputAmount', () => {
    it('should pass validation when amount is correct number', () => {
      expect(isInputAmountValid(123)).toBeTruthy();
    });

    // for the following assertions we have to wrap up the function calls into another function
    // otherwise the error will not be caught and the assertion will fail.
    // https://jestjs.io/docs/en/expect.html#tothrowerror

    it('should throw when amount string is missing', () => {
      expect(() => { isInputAmountValid() }).toThrow('The input amount is missing');
    });

    it('should throw when amount string is incorrect number', () => {
      expect(() => { isInputAmountValid(0.012) }).toThrow('The input must be a valid number');
    });
  });

  describe('getCoinsQuantity', () => {
    it('should return 50 for 100 cents by two cents', () => {
      expect(getCoinsQuantity(100, 2)).toBe(50);
    });

    it('should return 22 for 45 cents by two cents', () => {
      expect(getCoinsQuantity(45, 2)).toBe(22);
    });

    it('should return 1 for 100 cents by one Euro', () => {
      expect(getCoinsQuantity(100, 100)).toBe(1);
    });

    it('should return zero for 99 cents by one Euro', () => {
      expect(getCoinsQuantity(99, 100)).toBe(0);
    });
  });

  describe('getAvailableCoinsQuantity', () => {
    describe('when 10 cents by one cent are available', () => {
      const available: ReadonlyArray<Change> = [{ coin: CoinName.OneCent, quantity: 10 }];

      it('should return 10 for requested 10 cents by one cent', () => {
        const cents: number = 10;
        const coin: Coin = Coins.find((c: Coin) => c.name === CoinName.OneCent);

        expect(getAvailableCoinsQuantity(cents, available, coin)).toBe(10);
      });

      it('should return 0 for requested 10 cents by two cents', () => {
        const cents: number = 10;
        const coin: Coin = Coins.find((c: Coin) => c.name === CoinName.TwoCents);

        expect(getAvailableCoinsQuantity(cents, available, coin)).toBe(0);
      });

      it('should return 10 for requested 20 cents by one cents', () => {
        const cents: number = 20;
        const coin: Coin = Coins.find((c: Coin) => c.name === CoinName.OneCent);

        expect(getAvailableCoinsQuantity(cents, available, coin)).toBe(10);
      });

      it('should return 0 for requested 0 cents by one cents', () => {
        const cents: number = 0;
        const coin: Coin = Coins.find((c: Coin) => c.name === CoinName.OneCent);

        expect(getAvailableCoinsQuantity(cents, available, coin)).toBe(0);
      });
    });
  });
});
