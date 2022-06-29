let runnerElement;
let activeElement;
function startRunnerElement() {
    let list = document.querySelector(".header__list");
    let items = list.querySelectorAll(".header__list-item");
    activeElement = list.querySelector(".header__list-item.active");
    let i = 0;
    Array.prototype.find.apply(items, [
        (elem) => {
            if (elem.isEqualNode(activeElement)) return true;
            i++;
        },
    ]);
    runnerElement = i;
    moveRunner(runnerElement);
}
function moveRunner(pos) {
    let list = document.querySelector(".header__list");
    let items = list.querySelectorAll(".header__list-item");
    let runner = document.querySelector(".header__runner");
    let left = 0;
    let i = 0;
    for (i; i < pos; i++) {
        left += items[i].offsetWidth;
    }
    left += (items[i].offsetWidth - runner.offsetWidth) / 2;
    runner.style.left = left + "px";

    runner.style.transform = "scalex(1.5)";
    setTimeout(() => (runner.style.transform = "scalex(1)"), 300);
}

function headerRunnerEnter(event) {
    let list = document.querySelector(".header__list");
    let items = list.querySelectorAll(".header__list-item");
    let i = 0;
    Array.prototype.find.apply(items, [
        (elem) => {
            if (elem.isEqualNode(event.target)) return true;
            i++;
        },
    ]);
    activeElement.classList.remove("active");
    moveRunner(i);
}

function headerRunnerLeave(event) {
    activeElement.classList.add("active");
    moveRunner(runnerElement);
}

startRunnerElement();

document.querySelectorAll(".header__list-item").forEach((elem) => {
    elem.addEventListener("mouseenter", headerRunnerEnter);
    elem.addEventListener("mouseleave", headerRunnerLeave);
});

// * ------- * //

function scrollTo(event) {
    console.log(!!event);
    let pos =
        event.target.getBoundingClientRect().top +
        document.documentElement.scrollTop +
        event.target.offsetHeight;
    window.scroll(0, pos);
}
document.querySelectorAll("#scroller").forEach((elem) => {
    elem.addEventListener("mousedown", scrollTo);
});
