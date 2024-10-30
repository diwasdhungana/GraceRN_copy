import { client } from '../axios';
export async function getAccountInfo() {
  const response = await client.get('/questions');
  if (response.status === 200) {
    return true;
  }
  return false;
}
