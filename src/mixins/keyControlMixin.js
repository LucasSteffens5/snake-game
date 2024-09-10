export default {
    data() {
        return {
            velocity: {
                positionX: 0,
                positionY: 0,
            },
            timerLoopStatus: false,
        };
    },
    methods: {
        handleKeydown(e) {
            if (!this.status) {
                this.status = true;
            }

            if (e.keyCode === 37 && this.velocity.positionX !== 1 && this.timerLoopStatus) {
                this.setVelocity(-1, 0);
            } else if (e.keyCode === 38 && this.velocity.positionY !== 1 && this.timerLoopStatus) {
                this.setVelocity(0, -1);
            } else if (e.keyCode === 39 && this.velocity.positionX !== -1 && this.timerLoopStatus) {
                this.setVelocity(1, 0);
            } else if (e.keyCode === 40 && this.velocity.positionY !== -1 && this.timerLoopStatus) {
                this.setVelocity(0, 1);
            }
        },
        setVelocity(x, y) {
            this.timerLoopStatus = false;
            this.velocity.positionX = x;
            this.velocity.positionY = y;
        },
    },
    mounted() {
        document.addEventListener("keydown", this.handleKeydown);
    },
    beforeDestroy() {
        document.removeEventListener("keydown", this.handleKeydown);
    },
};