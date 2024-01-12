<template>
    <div v-for="card in cardsList" class="card-effects-list">
        <img :src="card.filename" style="width: 100px" />
        <div class="card-effects-list-info">
            <h1 class="card-name">{{ card.name }}</h1>
            <p>{{ card.effect }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardEffectsList",
    data() {
        return {
            cardsList: [
                {
                    name: "Positive",
                    filename: "/cards/Pos4.png",
                    effect: "Increase the stack by the number on the card",
                },
                {
                    name: "Negative",
                    filename: "/cards/Neg9.png",
                    effect: "Decrease the stack by the number on the card",
                },
                {
                    name: "Skip",
                    filename: "/cards/Sp0_skip.png",
                    effect: "Skip your turn without effecting the stack",
                },
                {
                    name: "Reverse",
                    filename: "/cards/Sp1_reverse.png",
                    effect: "Reverse the order of the turns",
                },
                {
                    name: "Random",
                    filename: "/cards/Sp2_random.png",
                    effect: "Randomize the order of the players' turns",
                },
                {
                    name: "Set to 99",
                    filename: "/cards/Sp3_set99.png",
                    effect: "Set the stack to 99",
                },
            ],
        };
    },
};
</script>

<style scoped>
.card-effects-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
    border-radius: 10px;
    background-color: #1e1e1e;
    padding: 10px;
}

.card-effects-list-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 350px;
    margin-top: 0;
    margin-left: 20px;
}

img {
    width: 100px;
    max-width: 100px;
    padding: 10px;
}

.card-name {
    margin: 0;
    padding: 0;
    font-size: 32px;
}

p {
    padding: 0;
    font-size: 16px;
    color: white;
}

@media screen and (max-width: 600px) {
    .card-effects-list {
        flex-direction: row;
        margin: 5px;
        margin-bottom: 10px;
        border-radius: 5px;
        padding: 5px;
    }

    .card-effects-list-info {
        width: 50vw;
        min-width: 150px;
        margin-top: 0;
        margin-left: 20px;
    }

    img {
        width: 70px;
        max-width: 70px;
        padding: 5px;
    }

    .card-name {
        margin: 0;
        padding: 0;
        font-size: 24px;
    }

    p {
        padding: 0;
        font-size: 14px;
        color: white;
    }
}
</style>
