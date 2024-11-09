import { client } from '../axios';
export async function getAccountInfo() {
  const response = await client.get('/tests/mine');
  if (response.status === 200) {
    return true;
  }
  return false;
}
