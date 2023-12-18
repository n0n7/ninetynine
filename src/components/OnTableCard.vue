<template>
    <div class="container">
        <div class="stack-value">
            <p>{{ stackValue }}</p>
        </div>
        <div class="top-card">
            <img
                :src="topCard.src"
                draggable="false"
                @drop="onDrop($event)"
                @dragenter.prevent
                @dragover.prevent
            />
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
    props: {
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
    methods: {
        test() {
            console.log(test);
        },
    },
    setup(props, { emit }) {
        const Neg = ["/cards/Neg10.png", "/cards/Neg9.png"];
        const Pos = [
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
        ];
        const Sp = [
            "/cards/Sp0_skip.png",
            "/cards/Sp1_reverse.png",
            "/cards/Sp2_random.png",
            "/cards/Sp3_set99.png",
        ];

        const topCard = computed(() => {
            if (props.lastPlayedCard.isSpecial) {
                return {
                    src: Sp[props.lastPlayedCard.value],
                };
            } else if (props.lastPlayedCard.value > 0) {
                return {
                    src: Pos[props.lastPlayedCard.value - 1],
                };
            } else {
                return {
                    src: Sp[props.lastPlayedCard.value + 10],
                };
            }
        });

        const onDrop = (event) => {
            const itemID = event.dataTransfer.getData("CardID");
            console.log(itemID);
            emit("playCard", itemID);
        };

        return {
            topCard,
            onDrop,
        };
    },
};
</script>

<style scoped>
.container {
    /* background-color: white; */
    display: flex;
    flex-direction: column;
    row-gap: 1vh;

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
