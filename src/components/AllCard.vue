<template>
    <div class="table-container">
        <div class="stack-value">
            <p>{{ stackValue }}</p>
        </div>
        <div class="top-card">
            <img ref="droppable" :src="topCard.src" @mouseover="toggle" />
        </div>
    </div>
    <div class="card-container" ref="container">
        <div v-for="card in cards" :key="card.id">
            <img
                class="card"
                draggable="false"
                :src="card.src"
                @mousedown="startDragging($event, card.id)"
                @mouseup="stopDragging($event, card.id)"
            />
        </div>
    </div>
    <!-- <p style="color:white; font-size:10rem; position:absolute;">{{bool}}</p> -->
</template>

<script>
import CountDownTimerVue from "./CountDownTimer.vue";
export default {
    props: {
        playerCards: {
            type: Array,
            default: [],
        },
        stackValue: {
            type: Number,
            required: true,
        },
        maxStackValue: {
            type: Number,
            default: 99,
        },
        lastPlayedCard: {
            type: Object,
            default: null,
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

            currentOffsetX: 0,
            currentOffsetY: 0,

            currentEvent: null,
            currentId: null,

            cards: null,
            isOnDrag: false,

            droppableArea: null,
        };
    },
    methods: {
        startDragging(event, id) {
            console.log("start dragging " + id);
            event.target.style.transition = "";
            event.target.className = "card dragged";
            const rect = event.target.getBoundingClientRect();
            const curX = event.clientX;
            const curY = event.clientY;

            this.currentOffsetX = curX - rect.left;
            this.currentOffsetY = curY - rect.top;

            this.isOnDrag = true;

            this.currentEvent = event;
            this.currentId = id;
        },
        stopDragging(event, id) {
            console.log("stop dragging " + id);

            this.isOnDrag = false;
            this.currentEvent = null;
            this.currentId = null;

            if (this.isDroppable(event.clientX, event.clientY)) {
                event.target.style.transition = "";
                this.$emit("playCard", id);
            } else {
                event.target.style.transition = "left 0.5s, top 0.5s ease-out";
            }

            event.target.className = "card";
            event.target.style.zIndex = "60";
            event.target.style.position = "relative";
            event.target.style.left = "0";
            event.target.style.top = "0";
        },
        moveCard(event, id) {
            if (this.isOnDrag) {
                const container = this.$refs.container.getBoundingClientRect();

                //hold position ver1
                let x = this.mousePos[0] - this.currentOffsetX - container.left;
                let y = this.mousePos[1] - this.currentOffsetY - container.top;

                // hold position ver2
                // const rect = event.target.getBoundingClientRect();
                // let x = this.mousePos[0] - rect.width / 2 - container.x;
                // let y = this.mousePos[1] - rect.height / 2 - container.y;

                if (this.isDroppable(this.mousePos[0], this.mousePos[1])) {
                    event.target.className = "card dragged highlighted";
                } else {
                    event.target.className = "card dragged";
                }

                event.target.style.position = "absolute";
                event.target.style.zIndex = "61";
                event.target.style.left = x + "px";
                event.target.style.top = y + "px";
            }
        },
        isDroppable(posX, posY) {
            this.droppableArea = this.$refs.droppable.getBoundingClientRect();
            // console.log(this.droppableArea);
            // console.log(event);
            if (!this.droppableArea) {
                return false; // or handle it accordingly
            }

            let x =
                posY > this.droppableArea.y &&
                posY < this.droppableArea.y + this.droppableArea.height &&
                posX > this.droppableArea.x &&
                posX < this.droppableArea.x + this.droppableArea.width;

            return x;
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
                        src: this.Neg[item.value + 10],
                    });
                }
            });
            console.log(arr);
            return arr;
        },
        topCard() {
            if (this.lastPlayedCard.isSpecial) {
                return {
                    src: this.Sp[this.lastPlayedCard.value],
                };
            } else if (this.lastPlayedCard.value > 0) {
                return {
                    src: this.Pos[this.lastPlayedCard.value - 1],
                };
            } else {
                return {
                    src: this.Neg[this.lastPlayedCard.value + 10],
                };
            }
        },
    },
    watch: {
        mousePos(value) {
            if (this.currentEvent !== null && this.currentId !== null) {
                if (
                    value[0] < 0 ||
                    value[0] > screen.width ||
                    value[1] < 0 ||
                    value[1] > screen.height
                ) {
                    this.stopDragging(this.currentEvent, this.currentId);
                } else {
                    this.moveCard(this.currentEvent, this.currentId);
                }
            }
        },
    },
    mounted() {
        document.addEventListener("mousemove", (event) => {
            this.mousePos = [event.clientX, event.clientY];
        });

        // this.droppableArea = this.$refs.droppable.getBoundingClientRect();
    },
    beforeDestroy() {
        document.removeEventListener("mousemove", this.updateDroppableArea);
    },
};
</script>

<style scoped>
.card-container {
    /* background: white; */
    /* border: 2px solid white; */
    position: fixed;
    /* width: 60vw;
    height: 61vh; */

    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    margin-top: auto;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    column-gap: 2vh;
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

.dragged {
    height: 25vh;
}

.highlighted {
    box-shadow: 0 0 5px 5px #a35bff;
    cursor: ;
}

.v-enter-active,
.v-leave-active {
    transition: ;
    transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

/* On table style */
.table-container {
    /* background-color: white; */
    display: flex;
    flex-direction: column;
    row-gap: 1vh;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

.stack-value {
    background: #2c2f32;
    border-radius: 1vh;
}

.stack-value p {
    color: white;
    text-align: center;
    font-size: 5vh;
    margin: 0;
}

.top-card img {
    height: 30vh;
    border-radius: 15px;
    vertical-align: middle;
}
</style>
