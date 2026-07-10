import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

const COOKIE_NAME = 'ncs_admin_session';
const TOKEN_TTL_SECONDS = 60 * 60 * 8; // 8h

function getJwtSecret(): string {
  const secret = process.env.SESSION_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error('SESSION_SECRET não está configurada.');
  return secret;
}

export interface AdminPayload {
  email: string;
  role: 'admin';
}

export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  return (
    timingSafeEqualStr(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()) &&
    timingSafeEqualStr(password, adminPassword)
  );
}

function timingSafeEqualStr(a: string, b: string): boolean {
  // Simple constant-ish comparison without leaking length via early exit on typical inputs.
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function signSessionToken(payload: AdminPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_TTL_SECONDS });
}

export function verifySessionToken(token: string | undefined): AdminPayload | null {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AdminPayload;
    if (decoded?.role !== 'admin') return null;
    return decoded;
  } catch {
    return null;
  }
}

export function buildSessionCookie(token: string): string {
  return cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_TTL_SECONDS,
  });
}

export function buildClearCookie(): string {
  return cookie.serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export function readSessionCookie(cookieHeader: string | undefined): string | undefined {
  if (!cookieHeader) return undefined;
  const parsed = cookie.parse(cookieHeader);
  return parsed[COOKIE_NAME];
}
