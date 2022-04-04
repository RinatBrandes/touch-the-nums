function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


function dShuffle(array) {
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
}