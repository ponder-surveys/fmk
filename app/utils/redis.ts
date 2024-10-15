import * as upstash from '@/app/utils/redisUpstash';
import * as redis from '@/app/utils/redisDefault';

function isUpstash(): boolean {
  return process.env.REDIS_UPSTASH_TOKEN !== undefined
}

export async function createGame(fmkId: string, option1: string, option2: string, option3: string, skin: string = 'default'): Promise<void> {
  if(isUpstash())
    return upstash.createGame(fmkId, option1, option2, option3, skin)
  else
    return redis.createGame(fmkId, option1, option2, option3, skin)
}

export async function updateStats(fmkId: string, option: string, choice: string): Promise<void> {
  if(isUpstash())
    return upstash.updateStats(fmkId, option, choice)
  else
    return redis.updateStats(fmkId, option, choice)
}

export async function getGameData(fmkId: string): Promise<Record<string, any>> {
  if(isUpstash())
    return upstash.getGameData(fmkId)
  else
    return redis.getGameData(fmkId)
}

export async function closeRedisConnection(): Promise<void> {
  if(isUpstash())
    return upstash.closeRedisConnection()
  else
    return redis.closeRedisConnection()
}

