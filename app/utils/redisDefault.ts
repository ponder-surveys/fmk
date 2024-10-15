import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | null = null;

async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));

    await redisClient.connect();
  }
  return redisClient;
}

export async function createGame(fmkId: string, option1: string, option2: string, option3: string, skin: string = 'default'): Promise<void> {
  const client = await getRedisClient();
  await client.hSet(`game:${fmkId}`, {
    'option1': option1,
    'option2': option2,
    'option3': option3,
    'skin': skin
  });

  for (const option of ["option1", "option2", "option3"]) {
    await client.hSet(`game:${fmkId}:stats:${option}`, {
      'f': '0',
      'm': '0',
      'k': '0'
    });
  }
}

export async function updateStats(fmkId: string, option: string, choice: string): Promise<void> {
  const client = await getRedisClient();
  await client.hIncrBy(`game:${fmkId}:stats:${option}`, choice, 1);
}

export async function getGameData(fmkId: string): Promise<Record<string, any>> {
  const client = await getRedisClient();
  const gameData = await client.hGetAll(`game:${fmkId}`);
  const stats: Record<string, Record<string, string>> = {};

  for (const option of ["option1", "option2", "option3"]) {
    stats[option] = await client.hGetAll(`game:${fmkId}:stats:${option}`);
  }

  return { ...gameData, stats };
}

export async function closeRedisConnection(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
}