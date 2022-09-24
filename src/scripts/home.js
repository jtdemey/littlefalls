const nav = document.querySelector("nav");
const navBtn = document.getElementById("nav-btn");

navBtn.onclick = () => {
  const display = nav.style.display;
  nav.style.display = display === "" || display === "none"
    ? "block"
    : "none";
};
