export function outTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor((time % 60) * 10) / 10;
    return `${hours > 0 ? `${hours}:`: ''}${minutes < 10 && hours > 0? '0':''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

