<template>
    <div class="card-container">
        <div v-for="card in cards" :key="card.id">
            <img :src="card.src" draggable="true" @dragstart="startDrag($event, card)" @dragend="stopDrag($event, card)" />
        </div>
    </div>
</template>

<script>
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
            Pos: ["/cards/Pos1.png",
                "/cards/Pos2.png",
                "/cards/Pos3.png",
                "/cards/Pos4.png",
                "/cards/Pos5.png",
                "/cards/Pos6.png",
                "/cards/Pos7.png",
                "/cards/Pos8.png",
                "/cards/Pos9.png",
                "/cards/Pos10.png"
            ],
            Sp: ["/cards/Sp0_skip.png",
                "/cards/Sp1_reverse.png",
                "/cards/Sp2_random.png",
                "/cards/Sp3_set99.png"
            ],
            // isShow: null
        }
    },
    methods: {
        startDrag(event, card) {
            console.log(card);
            // event.dataTransfer.dropEffect = 'move';
            // event.dataTransfer.effectAllowed = 'move';
            // this.isShow[card.id] = false;
            event.dataTransfer.setData('cardID', card.id);
        },
        stopDrag(event, card) {
            // this.isShow[card.id] = false;
        }
    },
    computed: {
        cards() {
            let arr=[];
            this.playerCards.forEach((item, index) => {
                if (item.isSpecial) {
                    arr.push({
                        id: index,
                        src: this.Sp[item.value]
                    });
                } else if (item.value > 0) {
                    arr.push({
                        id: index,
                        src: this.Pos[item.value - 1]
                    });
                } else {
                    arr.push({
                        id: index,
                        src: this.Sp[item.value + 10]
                    });
                }
            });
            // console.log(arr);
            return arr;
        }
    },
};
</script>

<style scoped>
.card-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    column-gap: 1rem;
    /* background: white; */
}

.card-container img {
    height: 20vh;
    border-radius: 15px;
    vertical-align: middle;
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
