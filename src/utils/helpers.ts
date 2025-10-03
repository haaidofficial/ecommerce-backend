import path from 'path';

export const normalizeFilePath = (filePath: string): string => {
    const removePath = path.join(process.cwd(), 'uploads');
    const p = filePath.replace(removePath, '');
    return p.replace(/\\/g, '/');
}