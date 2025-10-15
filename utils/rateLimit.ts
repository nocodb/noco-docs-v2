interface RateLimitData {
  count: number;
  firstRequest: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt?: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitData>;
  private cleanupIntervalId?: NodeJS.Timeout;

  constructor() {
    this.requests = new Map<string, RateLimitData>();
  }

  check(ip: string, limit: number, interval: number): RateLimitResult {
    const now = Date.now();

    if (!this.requests.has(ip)) {
      this.requests.set(ip, { count: 1, firstRequest: now });
      return { allowed: true, remaining: limit - 1 };
    }

    const data = this.requests.get(ip)!;

    if (now - data.firstRequest > interval) {
      this.requests.set(ip, { count: 1, firstRequest: now });
      return { allowed: true, remaining: limit - 1 };
    }

    data.count += 1;

    if (data.count > limit) {
      return { 
        allowed: false, 
        remaining: 0,
        resetAt: data.firstRequest + interval 
      };
    }

    return { 
      allowed: true, 
      remaining: limit - data.count 
    };
  }

  cleanup(interval: number): void {
    const now = Date.now();
    for (const [ip, data] of this.requests.entries()) {
      if (now - data.firstRequest > interval) {
        this.requests.delete(ip);
      }
    }
  }

  startCleanup(interval: number): void {
    this.cleanupIntervalId = setInterval(() => this.cleanup(interval), interval);
  }

  stopCleanup(): void {
    if (this.cleanupIntervalId) {
      clearInterval(this.cleanupIntervalId);
      this.cleanupIntervalId = undefined;
    }
  }

  reset(): void {
    this.requests.clear();
    this.stopCleanup();
  }
}

const rateLimiter = new RateLimiter();
rateLimiter.startCleanup(60000); 

interface RateLimitConfig {
  limit?: number;
  interval?: number;
  identifier?: string;
}

export function validateRateLimit(
  request: Request,
  config: RateLimitConfig = {}
): Response | null {
  const { limit = 10, interval = 60000, identifier } = config;

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const key = identifier ? `${ip}:${identifier}` : ip;

  const rateLimit = rateLimiter.check(key, limit, interval);

  if (!rateLimit.allowed) {
    const retryAfter = Math.ceil(
      ((rateLimit.resetAt ?? 0) - Date.now()) / 1000
    );

    return Response.json(
      {
        error: 'Too many requests',
        message: 'Please try again later',
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimit.resetAt?.toString() ?? '',
          'Retry-After': retryAfter.toString(),
        },
      }
    );
  }

  return null;
}

export default rateLimiter;
