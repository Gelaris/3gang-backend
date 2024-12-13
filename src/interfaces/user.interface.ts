export interface User {
  id: number;
  telegramId: string;
  money: number;
  level: number;
  items: UserItem[];
  lastUpdated: Date;
}

export interface UserItem {
  id: number;
  userId: number;
  itemId: number;
  type: 'instrument' | 'equipment' | 'studio';
  purchaseDate: Date;
} 