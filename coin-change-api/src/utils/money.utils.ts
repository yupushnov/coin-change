import { Coin, Change } from '../models/change.model';

/**
 * Validates input amount
 * @param amount Input amount in string format
 * @returns Validation result with "isValid" flag and error message when validation failed
 */
export const isInputAmountValid = (amount?: number | null): boolean => {
  if (typeof amount === 'undefined' || amount === null) {
    throw Error('The input amount is missing');
  }

  if (amount % 1 !== 0) {
    throw Error('The input must be a valid number');
  }

  return true;
};

/**
 * Returnes number of coins for the amount in cents
 * @param cents Amount in cents
 * @param value Requested coin value
 * @returns number of coins
 */
export const getCoinsQuantity = (cents: number, value: number): number => Math.floor(cents / value);

/**
 * Returnes available number of coins for the amount in cents
 * @param cents Amount in cents
 * @param availableChange Available change
 * @param coin Requested coin
 */
export const getAvailableCoinsQuantity = (cents: number, availableChange: ReadonlyArray<Change>, coin: Coin): number => {
  const change: Change = availableChange.find((change: Change) => change.coin === coin.name);
  const availableQuantity: number = change ? change.quantity : 0;
  
  return Math.min(availableQuantity, getCoinsQuantity(cents, coin.value));
}
