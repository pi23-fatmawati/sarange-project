document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const incrementButton = counter.querySelector(".increment");
    const decrementButton = counter.querySelector(".decrement");
    const countSpan = counter.querySelector(".count");

    let count = 0;

    incrementButton.addEventListener("click", function () {
      count++;
      count = count < 10 && count != 0 ? "0" + count : count;
      countSpan.textContent = count;
    });

    decrementButton.addEventListener("click", function () {
      if (count > 0) {
        count--;
        count = count < 10 && count != 0 ? "0" + count : count;
        countSpan.textContent = count;
      }
    });
  });
});
