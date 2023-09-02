const NO_ADVANTAGE = 0;
const ADVANTAGE = 1;
const DISADVANTAGE = 2;

const tracker = document.getElementById("tracker_list");
var creature = tracker.children[0].cloneNode(true);
const plusButton = document.getElementById("plus");
const rollButton = document.getElementById("roll");
const sortButton = document.getElementById("sort");

function roll(max, adv) {
    var firstRoll = Math.floor(Math.random() * max) + 1;
    var secondRoll = Math.floor(Math.random() * max) + 1;
    if (adv == NO_ADVANTAGE) {
        return firstRoll;
    }
    if (adv == ADVANTAGE) {
        return Math.max(firstRoll, secondRoll);
    }
    return Math.min(firstRoll, secondRoll);
}

function getFirstByClassName(from, name) {
    var children = from.children;
    for (var i = 0; i < children.length; i++){
        if (children.item(i).className == name) {
            return children.item(i);
        }
    }
}

plusButton.onclick = () => {
    tracker.appendChild(creature);
    creature = creature.cloneNode(true);
};

rollButton.onclick = () => {
    var creatures = tracker.getElementsByTagName("li");
    for (var i = 0; i < creatures.length; i++) {
        var result = getFirstByClassName(creatures.item(i), "result");
        var adv = getFirstByClassName(creatures.item(i), "advantage");
        var bonus = getFirstByClassName(creatures.item(i), "bonus");
        var reroll = getFirstByClassName(creatures.item(i), "reroll");
        if (result.value == "" || reroll.checked) {
            result.value = roll(20, adv.value) + Number(bonus.value);
        }
    }
};

sortButton.onclick = () => {
    var creatures = tracker.getElementsByTagName("li");
    Array.from(creatures)
        .sort((a, b) => getFirstByClassName(b, "result").value - getFirstByClassName(a, "result").value)
        .forEach(li => tracker.appendChild(li));
};
