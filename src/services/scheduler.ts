export class Scheduler {
    
    private timer: NodeJS.Timeout | null = null;
    private running = false;

    startScheduler(callback: () => Promise<void>, minutes: number) {

        const ms = minutes * 60 * 1000;

        if (this.timer) clearInterval(this.timer);

        this.timer = setInterval(async () => {
            if (this.running) return;
            this.running = true;

            try {
                await callback();
            } catch (error) {
                return;
            }

            this.running = false;
        }, ms);
    }

    stopScheduler(): void {

        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    }
}
