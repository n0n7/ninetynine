<template>
    <!-- <div class="card-container" ref="container"> -->
    <div v-for="card in cards" :key="card.id">
        <img
            class="card"
            draggable="false"
            :src="card.src"
            @mousedown="startDragging($event, card.id)"
            @mouseup="stopDragging($event, card.id)"
            style="position: relative; left: 0; top: 0; zindex: 60"
        />
    </div>
    <!-- </div> -->
</template>

<script>
import CountDownTimerVue from "./CountDownTimer.vue";
export default {
    props: {
        playerCards: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            Neg: ["/cards/Neg10.png", "/cards/Neg9.png"],
            Pos: [
                "/cards/Pos1.png",
                "/cards/Pos2.png",
                "/cards/Pos3.png",
                "/cards/Pos4.png",
                "/cards/Pos5.png",
                "/cards/Pos6.png",
                "/cards/Pos7.png",
                "/cards/Pos8.png",
                "/cards/Pos9.png",
                "/cards/Pos10.png",
            ],
            Sp: [
                "/cards/Sp0_skip.png",
                "/cards/Sp1_reverse.png",
                "/cards/Sp2_random.png",
                "/cards/Sp3_set99.png",
            ],

            mousePos: [0, 0],

            offsetX: 0,
            offsetY: 0,

            currentEvent: null,
            currentId: null,

            cards: null,
            isOnDrag: [false, false, false],
        };
    },
    methods: {
        startDragging(event, id) {
            console.log("start dragging " + id);
            const rect = event.target.getBoundingClientRect();
            const curX = event.clientX;
            const curY = event.clientY;

            this.offsetX = curX - rect.left;
            this.offsetY = curY - rect.top;

            this.isOnDrag[id] = true;

            this.currentEvent = event;
            this.currentId = id;
            // this.moveCard(event, id, rect, [offsetX, offsetY]);
        },
        stopDragging(event, id) {
            console.log("stop dragging " + id);
            this.isOnDrag[id] = false;
            // event.target.style.position = '';
            event.target.style.zIndex = "60";

            this.currentEvent = null;
            this.currentId = null;
        },
        moveCard(event, id) {
            if (this.isOnDrag[id]) {
                let x = this.mousePos[0] - this.offsetX;
                let y = this.mousePos[1] - this.offsetY;

                event.target.style.position = "absolute";
                event.target.style.zIndex = "61";
                event.target.style.left = x + "px";
                event.target.style.top = y + "px";
            }
        },
    },
    computed: {
        cards() {
            let arr = [];
            this.playerCards.forEach((item, index) => {
                if (item.isSpecial) {
                    arr.push({
                        id: index,
                        src: this.Sp[item.value],
                    });
                } else if (item.value > 0) {
                    arr.push({
                        id: index,
                        src: this.Pos[item.value - 1],
                    });
                } else {
                    arr.push({
                        id: index,
                        src: this.Sp[item.value + 10],
                    });
                }
            });
            // console.log(arr);
            return arr;
        },
    },
    mounted() {
        document.addEventListener("mousemove", (event) => {
            this.mousePos = [event.clientX, event.clientY];
        });
    },
    watch: {
        mousePos(value) {
            if (this.currentEvent !== null && this.currentId !== null)
                this.moveCard(this.currentEvent, this.currentId);
        },
    },
};
</script>

<style scoped>
.card-container {
    /* background: white; */
    border: 2px solid white;
    position: fixed;
    width: 60vw;
    height: 61vh;

    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: row;
}

.card {
    height: 20vh;
    border-radius: 1vh;
    vertical-align: middle;
    cursor: grab;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

.card:active {
    cursor: grabbing;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
