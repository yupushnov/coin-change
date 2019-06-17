export const enum CoinName {
  OneEuro = 'One Euro',
  FiftyCents = 'Fifty Cents',
  TwentyCents = 'Twenty Cents',
  TenCents = 'Ten Cents',
  FiveCents = 'Five Cents',
  TwoCents = 'Two Cents',
  OneCent = 'One Cent'
};

export const Coins: ReadonlyArray<Coin> = [
  { name: CoinName.OneEuro, value: 100 },
  { name: CoinName.FiftyCents, value: 50 },
  { name: CoinName.TwentyCents, value: 20 },
  { name: CoinName.TenCents, value: 10 },
  { name: CoinName.FiveCents, value: 5 },
  { name: CoinName.TwoCents, value: 2 },
  { name: CoinName.OneCent, value: 1 }
];

export interface Coin {
  name: CoinName,
  value: number
};

export interface Change {
  coin: CoinName,
  quantity: number
};

export interface RequestBody {
  euro: number
}
