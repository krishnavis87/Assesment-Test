// You can expand this to dynamically load video events, incidents, etc.

document.querySelectorAll(".incident-list button").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Incident resolved!");
  });
});
