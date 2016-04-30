export const TOKEN = 0;
export const MODERATOR = 1;
export const ADMINISTRATOR = 2;
export const HIERARCHY = [TOKEN, MODERATOR, ADMINISTRATOR];
export function name(auth) {
    switch (auth) {
    case TOKEN: return 'TOKEN';
    case MODERATOR: return 'MODERATOR';
    case ADMINISTRATOR: return 'ADMINISTRATOR';
    }
}
