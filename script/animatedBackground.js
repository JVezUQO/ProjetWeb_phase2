// code trouver sur : https://www.vantajs.com/
/* Code qui permet de charger l'arrière plan */
window.addEventListener("DOMContentLoaded", () => {
  VANTA.FOG({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    highlightColor: 0x656a7c,
    midtoneColor: 0x413e5e,
    lowlightColor: 0x3a374c,
    baseColor: 0x2021a,
    blurFactor: 0.67,
    speed: 0.5,
    zoom: 0.9,
  });
  setTimeout(() => {
    const main = document.querySelector("main");
    main.style.opacity = 1;
    main.style.filter = "blur(0px)";
  }, 1000);
});
