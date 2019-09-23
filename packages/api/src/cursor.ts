function fromBase64(id: string) {
    return Buffer.from(id, 'base64').toString();
}

function toBase64(identifier: string) {
    return Buffer.from(identifier).toString('base64');
}

export function deserializeCursor(cursor: string): [string, string] {
    const s = fromBase64(cursor);
    const splitIndex = s.indexOf(':');
    const provider = s.substring(0, splitIndex);
    const identifier = s.substring(splitIndex + 1);
    return [provider, identifier];
}

export function serializeCursor(provider: string, payload: string): string {
    return toBase64(`${provider}:${payload}`);
}