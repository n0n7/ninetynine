<template>
    <div class="table-container">
        <div class="stack-value">
            <p>{{ stackValue }}</p>
        </div>
        <div class="top-card">
            <img
                ref="droppable"
                :src="topCard"
                @mouseover="toggle"
                draggable="false"
            />
        </div>
    </div>
    <transition>
        <div class="inform-text" v-if="isPlayerOut">
            <p style="out-message">You are out!</p>
        </div>
        <div class="card-container" ref="container" v-else>
            <div
                v-for="(card, index) in cards"
                :key="index"
                ref="draggableCards"
            >
                <img
                    class="card"
                    draggable="false"
                    :src="card.src"
                    @mousedown="mouseStartDragging($event, card)"
                    @mousemove="mouseMoveCard"
                    @mouseup="mouseStopDragging"
                    @touchstart="touchStartDragging($event, card)"
                    @touchmove="touchMoveCard"
                    @touchend="touchStopDragging"
                    style="position: relative; left: 0; top: 0"
                />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    emits: ["playCard"],
    props: {
        playerCards: {
            type: Array,
            default: [],
        },
        stackValue: {
            type: Number,
            required: true,
        },
        lastPlayedCard: {
            type: Object,
            default: null,
        },
        isPlayerOut: {
            type: Boolean,
            default: false,
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

            isDragging: false,
            currOffsetX: 0,
            currOffsetY: 0,
            currCard: null,

            droppableArea: null,
        };
    },
    methods: {
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
        mouseStartDragging(event, card) {
            if (!this.isDragging) {
                // console.log("start dragging ");

                this.$refs.draggableCards[card.id].style.transition = "";
                this.$refs.draggableCards[card.id].style.transform =
                    "scale(1.2)";

                this.currCard = card;
                this.isDragging = true;

                const rect =
                    this.$refs.draggableCards[card.id].getBoundingClientRect();

                this.currOffsetX = event.clientX - rect.left;
                this.currOffsetY = event.clientY - rect.top;

                window.addEventListener("mousemove", this.mouseMoveCard);
                window.addEventListener("mouseup", this.mouseStopDragging);
            }
        },
        mouseStopDragging(event) {
            if (this.isDragging) {
                // console.log("stop dragging ");
                this.isDragging = false;

                if (this.isDroppable(event.clientX, event.clientY)) {
                    event.target.style.transition = "";
                    this.$emit("playCard", this.currCard.id);
                } else {
                    this.$refs.draggableCards[
                        this.currCard.id
                    ].style.transition = "left 0.5s, top 0.5s ease-out";
                }

                this.$refs.draggableCards[this.currCard.id].style.boxShadow =
                    "";
                this.$refs.draggableCards[this.currCard.id].style.transform =
                    "scale(1)";
                this.$refs.draggableCards[this.currCard.id].style.zIndex = "60";
                this.$refs.draggableCards[this.currCard.id].style.position =
                    "relative";
                this.$refs.draggableCards[this.currCard.id].style.left = "0";
                this.$refs.draggableCards[this.currCard.id].style.top = "0";

                window.removeEventListener("mousemove", this.mouseMoveCard);
                window.removeEventListener("mouseup", this.mouseStopDragging);
                this.currCard = null;
            }
        },
        mouseMoveCard(event) {
            if (this.isDragging) {
                // console.log("moving");

                const container = this.$refs.container.getBoundingClientRect();

                let mouseX =
                    event.clientX < 0
                        ? 0
                        : event.clientX > window.innerWidth
                        ? window.innerWidth
                        : event.clientX;
                let mouseY =
                    event.clientY < 0
                        ? 0
                        : event.clientY > window.innerHeight
                        ? window.innerHeight
                        : event.clientY;

                let x = mouseX - this.currOffsetX - container.left;
                let y = mouseY - this.currOffsetY - container.top;

                if (this.isDroppable(event.clientX, event.clientY)) {
                    this.$refs.draggableCards[
                        this.currCard.id
                    ].style.boxShadow = "0 0 5px 5px #a35bff";
                    this.$refs.draggableCards[
                        this.currCard.id
                    ].style.borderRadius = "1vh";
                } else {
                    this.$refs.draggableCards[
                        this.currCard.id
                    ].style.boxShadow = "";
                }

                this.$refs.draggableCards[this.currCard.id].style.position =
                    "absolute";
                this.$refs.draggableCards[this.currCard.id].style.zIndex = "61";
                this.$refs.draggableCards[this.currCard.id].style.left =
                    x + "px";
                this.$refs.draggableCards[this.currCard.id].style.top =
                    y + "px";
            }
        },
        touchStartDragging(event, card) {
            if (!this.isDragging) {
                // console.log("touch start dragging ");

                const touch = event.touches[0];
                // console.log(touch);

                this.$refs.draggableCards[card.id].style.transition = "";
                this.$refs.draggableCards[card.id].style.transform =
                    "scale(1.2)";

                this.currCard = card;
                this.isDragging = true;

                const rect =
                    this.$refs.draggableCards[card.id].getBoundingClientRect();

                this.currOffsetX = touch.clientX - rect.left;
                this.currOffsetY = touch.clientY - rect.top;

                window.addEventListener("touchmove", this.touchMoveCard);
                window.addEventListener("touchend", this.touchStopDragging);
            }
        },
        touchStopDragging(event) {
            if (this.isDragging) {
                // console.log("stop dragging ");
                this.isDragging = false;

                // console.log(event);
                const touch = event.changedTouches[0];

                if (this.isDroppable(touch.clientX, touch.clientY)) {
                    event.target.style.transition = "";
                    this.$emit("playCard", this.currCard.id);
                } else {
                    this.$refs.draggableCards[
                        this.currCard.id
                    ].style.transition = "left 0.5s, top 0.5s ease-out";
                }

                this.$refs.draggableCards[this.currCard.id].style.boxShadow =
                    "";
                this.$refs.draggableCards[this.currCard.id].style.transform =
                    "scale(1)";
                this.$refs.draggableCards[this.currCard.id].style.zIndex = "60";
                this.$refs.draggableCards[this.currCard.id].style.position =
                    "relative";
                this.$refs.draggableCards[this.currCard.id].style.left = "0";
                this.$refs.draggableCards[this.currCard.id].style.top = "0";

                window.removeEventListener("touchmove", this.touchMoveCard);
                window.removeEventListener("touchend", this.touchStopDragging);
                this.currCard = null;
            }
        },
        touchMoveCard(event) {
            if (this.isDragging) {
                // console.log("touch moving");

                const container = this.$refs.container.getBoundingClientRect();
                // console.log(container);

                let touch = null;

                // the touchmove event is seperate into moving and standstill
                if ("clientX" in event) {
                    touch = event;
                } else {
                    touch = event.touches[0];
                }

                let touchX =
                    touch.clientX < 0
                        ? 0
                        : touch.clientX > window.innerWidth
                        ? window.innerWidth
                        : touch.clientX;
                let touchY =
                    touch.clientY < 0
                        ? 0
                        : touch.clientY > window.innerHeight
                        ? window.innerHeight
                        : touch.clientY;

                let x = touchX - this.currOffsetX - container.left;
                let y = touchY - this.currOffsetY - container.top;

                if (this.isDroppable(touch.clientX, touch.clientY)) {
                    this.$refs.draggableCards[
                        this.currCard.id
                    ].style.boxShadow = "0 0 5px 5px #a35bff";
                    this.$refs.draggableCards[
                        this.currCard.id
                    ].style.borderRadius = "1vh";
                } else {
                    this.$refs.draggableCards[
                        this.currCard.id
                    ].style.boxShadow = "";
                }

                // if("clientX" in event) {
                //     console.log("clientX standstill"+event.clientX);
                // }
                // else {
                //     console.log("clientX moving"+event.touches[0].clientX);
                // }

                // console.log("offSetX: "+this.currOffsetX);
                // console.log("offSetY: "+this.currOffsetY);
                // console.log("x: "+x);
                // console.log("y: "+y);
                // console.log("touchX: "+touchX);
                // console.log("touchY: "+touchY);
                // console.log("clientX: "+event.clientX);
                // console.log("clientY: "+event.clientY);
                // console.log("innerWeigth: "+window.innerWidth);
                // console.log("innerHeight: "+window.innerHeight);

                this.$refs.draggableCards[this.currCard.id].style.position =
                    "absolute";
                this.$refs.draggableCards[this.currCard.id].style.zIndex = "61";
                this.$refs.draggableCards[this.currCard.id].style.left =
                    x + "px";
                this.$refs.draggableCards[this.currCard.id].style.top =
                    y + "px";
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
                        src: this.Neg[item.value + 10],
                    });
                }
            });
            // console.log(arr);
            return arr;
        },
        topCard() {
            if (this.lastPlayedCard.isSpecial) {
                if (this.lastPlayedCard.value == -1) {
                    return "/cards/Empty.png";
                } else {
                    return this.Sp[this.lastPlayedCard.value];
                }
            } else if (this.lastPlayedCard.value > 0) {
                return this.Pos[this.lastPlayedCard.value - 1];
            } else {
                return this.Neg[this.lastPlayedCard.value + 10];
            }
        },
    },
};
</script>

<style scoped>
.card-container {
    /* background: white; */
    /* border: 2px solid white; */
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    margin-top: auto;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    column-gap: 2vh;

    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10 and IE 11 */
    user-select: none;
    /* Standard syntax */
}

.card {
    height: 20vh;
    border-radius: 1vh;
    vertical-align: middle;
    cursor: grab;
}

.card:active {
    cursor: grabbing;
}

.v-enter-active,
.v-leave-active {
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

    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10 and IE 11 */
    user-select: none;
    /* Standard syntax */
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

.inform-text {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
}

.inform-text p {
    color: white;
    font-size: 5vw;
    margin: 0;
}

@media screen and (max-width: 600px) {
    .top-card img {
        height: 25vh;
    }

    .card-container {
        margin-bottom: 2vh;
        column-gap: 1vh;
    }

    .card {
        height: 18vh;
    }
}
</style>
