// Alias for parseFrenchDate to match test import
export const validateDate = parseFrenchDate;

// Alias for isValidIPv6 to match test import
export const validateIPV6 = isValidIPv6;
// Utility functions for validating album data

export function isValidAlbumTitle(title: string): boolean {
  return typeof title === 'string' && title.trim().length > 0;
}

export function isValidAlbumYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year > 1900 && year <= currentYear;
}

export function isValidArtistName(artist: string): boolean {
  return typeof artist === 'string' && artist.trim().length > 0;
}

// Validate date from text input in French format (DD/MM/YYYY) and convert to Date object
export function parseFrenchDate(dateStr: string): Date | null {
  const regex = /^([0-2]\d|3[01])\/(0\d|1[0-2])\/(\d{4})$/;
  const match = dateStr.match(regex);
  if (!match || !match[1] || !match[2] || !match[3]) return null;
  const day = parseInt(match[1] as string, 10);
  const month = parseInt(match[2] as string, 10) - 1;
  const year = parseInt(match[3] as string, 10);
  const date = new Date(year, month, day);
  // Check for valid date (e.g., 31/02/2022 is invalid)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) return null;
  return date;
}

// Validate GUID format
export function isValidGUID(guid: string): boolean {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return regex.test(guid);
}

// Validate IPv6 address format
export function isValidIPv6(ip: string): boolean {
  // Simple IPv6 regex, does not cover all edge cases but works for most valid addresses
  const regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9]))$/;
  return regex.test(ip);
}

// Function to sort albums by name, artist, or genre
// Note: Album type does not have genre, so genre sort will be a no-op unless added
export function sortAlbums(albums: Array<{ title: string; artist: string; genre?: string }>, by: 'title' | 'artist' | 'genre'): typeof albums {
  return [...albums].sort((a, b) => {
    if (by === 'genre') {
      // If genre is missing, treat as empty string
      return (a.genre ?? '').localeCompare(b.genre ?? '');
    }
    return (a[by] as string).localeCompare(b[by] as string);
  });
}
