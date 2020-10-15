export class TTLCache<T> {

    private cachedValue: T | null = null;
    private cachedTimestamp: number = 0;

    constructor(
        private readonly getUncachedValue: () => T,
        private readonly ttlInMs: number
    ) {}

    public getValue(): T {
        if (this.cachedValue === null || Date.now() - this.cachedTimestamp > this.ttlInMs) {
            this.cachedValue = this.getUncachedValue();
            this.cachedTimestamp = Date.now();
        }

        return this.cachedValue;
    }

    public getLastUpdatedSecondsAgo(): number {
        return Math.round((Date.now() - this.cachedTimestamp) / 1000);
    }

}