export const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function api<T>(path: string, opts: { method?: string; body?: unknown; token?: string | null } = {}): Promise<T> {
  if (!API) throw new Error("The server address is not configured yet.");
  let r: Response;
  try {
    r = await fetch(API + path, {
      method: opts.method ?? "GET",
      headers: { "Content-Type": "application/json", ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}) },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. It may be waking up, so try again in a minute.");
  }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j as { error?: string }).error ?? "Something went wrong.");
  return j as T;
}
