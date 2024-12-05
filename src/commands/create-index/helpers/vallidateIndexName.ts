export function validateElasticsearchIndexName(indexName: string) {
  // Define validation rules
  const MAX_LENGTH = 255;

  // Check for reserved names
  const reservedNames = ['.', '..'];
  if (reservedNames.includes(indexName)) {
    return { isValid: false, reason: "Index name cannot be '.' or '..'." };
  }

  // Check for reserved patterns
  if (indexName === '' || indexName.startsWith('.')) {
    return { isValid: false, reason: "Index name cannot be empty or start with '.' unless explicitly allowed." };
  }

  if (/^\+|-|_/.test(indexName)) {
    return { isValid: false, reason: "Index name cannot start with '+', '-' or '_'." };
  }

  // Check for valid characters and lowercase
  if (!/^[a-z0-9._-]+$/.test(indexName)) {
    return { isValid: false, reason: "Index name must contain only lowercase letters, digits, '.', '_', or '-'." };
  }

  // Check maximum length
  if (Buffer.byteLength(indexName, 'utf8') > MAX_LENGTH) {
    return { isValid: false, reason: `Index name cannot exceed ${MAX_LENGTH} bytes.` };
  }

  return { isValid: true };
}
