export interface ErrorExplanation {
    message: string;
    reason: string;
    fix: string;
    suggestions?: string[];
}
export interface PrettyTryResult<T> {
    success: boolean;
    data?: T;
    error?: ErrorExplanation;
}
export declare function prettyTry<T>(fn: () => T): PrettyTryResult<T>;
export declare function prettyTryAsync<T>(fn: () => Promise<T>): Promise<PrettyTryResult<T>>;
export declare function formatError(errorExplanation: ErrorExplanation): string;
export declare function logError(errorExplanation: ErrorExplanation): void;
