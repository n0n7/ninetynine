<template>
    <p>- The game starts with everyone receiving 3 random cards and a global "stack" of 0.</p>
    <p>- On each player's turn, you need to play 1 card, which will either increase or decrease the "stack" by a certain number depending on the card's effect. Another random card will be drawn for you after playing and finishing your turn. Next player's turn will then begin.</p>
    <p>- You can't play a card that makes the "stack" value exceeds 99. (99 is fine, but not 100)</p>
    <p>- The "stack" can be a negative value.</p>
    <p>- If you can't play any cards out of all 3 that you have, you lose and will be out of the game until the game ends.</p>
    <p>- Last person standing wins.</p>
</template>

<script>
export default {
    name: "HowToPlay",
};
</script>

<style scoped>
p {
    font-size: 20px;
    color: white;
}
</style>