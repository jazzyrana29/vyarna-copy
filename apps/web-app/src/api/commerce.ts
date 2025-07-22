import { EXPO_PUBLIC_API_URL } from '@env';
import { AddBoosterPackInCartDto } from 'ez-utils';

export async function addBoosterPackInCart(
  dto: AddBoosterPackInCartDto,
): Promise<any> {
  const resp = await fetch(
    `${EXPO_PUBLIC_API_URL}/vy-commerce/add-booster-pack-in-cart`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    },
  );
  if (!resp.ok) {
    throw new Error('Failed to add booster pack');
  }
  return resp.json();
}
