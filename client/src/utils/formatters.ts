export function getInitials(name: string): string {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function getFirstName(fullName: string): string {
  if (!fullName) return "";
  return fullName.trim().split(" ")[0];
}
