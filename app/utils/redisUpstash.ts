import { Redis } from '@upstash/redis'

let redisClient: Redis | null = null;

function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.REDIS_URL || '',
      token: process.env.REDIS_UPSTASH_TOKEN || ''
    });
  }
  return redisClient;
}

export async function createGame(fmkId: string, option1: string, option2: string, option3: string, skin: string = 'default'): Promise<void> {
  const client = getRedisClient();
  await client.hset(`game:${fmkId}`, {
    'option1': option1,
    'option2': option2,
    'option3': option3,
    'skin': skin
  });

  for (const option of ["option1", "option2", "option3"]) {
    await client.hset(`game:${fmkId}:stats:${option}`, {
      'f': '0',
      'm': '0',
      'k': '0'
    });
  }
}

export async function updateStats(fmkId: string, option: string, choice: string): Promise<void> {
  const client = getRedisClient();
  console.log(`Updating stats for game ${fmkId}, option ${option}, choice ${choice}`);
  await client.hincrby(`game:${fmkId}:stats:${option}`, choice, 1);
}

export async function getGameData(fmkId: string): Promise<Record<string, any>> {
  const client = getRedisClient();
  const gameData = await client.hgetall(`game:${fmkId}`);
  const stats: Record<string, Record<string, string>> = {};

  for (const option of ["option1", "option2", "option3"]) {
    stats[option] = await client.hgetall(`game:${fmkId}:stats:${option}`) as Record<string, string>;
  }

  return { ...gameData, stats };
}

// Note: Upstash Redis client doesn't require an explicit connection closure
// But we'll keep this function for consistency with the standard Redis implementation
export async function closeRedisConnection(): Promise<void> {
  // No action needed for Upstash Redis
  redisClient = null;
}