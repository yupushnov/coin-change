import { Coins, Coin, Change, CoinName } from '../models/change.model';
import { isInputAmountValid, getCoinsQuantity, getAvailableCoinsQuantity } from '../utils/money.utils';

/**
 * Returnes available coinage
 * @returns Available change
 */
export const getAvailableChange = (): ReadonlyArray<Change> => [
  { coin: CoinName.OneEuro, quantity: 11 },
  { coin: CoinName.FiftyCents, quantity: 24 },
  { coin: CoinName.TwentyCents, quantity: 0 },
  { coin: CoinName.TenCents, quantity: 99 },
  { coin: CoinName.FiveCents, quantity: 200 },
  { coin: CoinName.TwoCents, quantity: 11 },
  { coin: CoinName.OneCent, quantity: 23 }
];

/**
 * Assume an unlimited supply of coins returns optimal change for passed amount
 * @param amount Amount in cents
 * @returns Optimal change for the passed amount
 */
export const getOptimalChangeFor = (amount: number): Array<Change> => {
  if (isInputAmountValid(amount)) {
    let cents: number = amount;

    return Coins.map((coin: Coin): Change => {
      if (cents > 0) {
        const quantity: number = getCoinsQuantity(cents, coin.value);

        if (quantity > 0) {
          cents -= coin.value * quantity;
          return { coin: coin.name, quantity };
        }
      }
      return;
    }).filter((c: Change): Change => c);
  }
};

/**
 * With the limited set of coins returns optimal change for passed amount
 * @param amount Amount in cents
 * @returns Optimal change for the passed amount
 */
export const getChangeFor = (amount: number): Array<Change> => {
  if (isInputAmountValid(amount)) {
    let cents: number = amount;

    const change = Coins.map((coin: Coin): Change => {
      if (cents > 0) {
        const quantity: number = getAvailableCoinsQuantity(cents, getAvailableChange(), coin);

        if (quantity > 0) {
          cents -= coin.value * quantity;
          return { coin: coin.name, quantity };
        }
      }
      return;
    }).filter((c: Change): Change => c);

    if (cents > 0) {
      throw Error('Insufficient coinage');
    }
    return change;
  }
};
