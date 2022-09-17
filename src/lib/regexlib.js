/**
 * Matches all whitespace characters, including new lines
 */
export const allWhitespaceInbetween = /(?:[\s\n])+/gm;

/**
 * Matches the internal delimiter which differs from the
 * root template characters to avoid accidentally matching it
 */
export const delimInternal = /\%\%/gm;

/**
 * Matches the internal root identifier
 */
export const internalRoot = /\$ROOT\$/gim;
