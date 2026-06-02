/**
 * Simple class name merger utility.
 * Filters out falsy values and joins class strings.
 * Compatible with all frameworks without external dependencies.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
