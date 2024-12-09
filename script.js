document.getElementById("div1").addEventListener("mousedown", grabresult);
document.getElementById("div2").addEventListener("mousedown", grabresult);
document.getElementById("div3").addEventListener("mousedown", grabresult);
document.getElementById("div4").addEventListener("mousedown", grabresult);

const rel = document.getElementById("rela");
let div;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

function grabresult() {
  this.classList.add("sele");
  div = this;
}

function remove() {
  let tchau = document.querySelector(".sele");
  if (tchau) {
    tchau.classList.remove("sele");
  }
}

rel.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("sele")) {
    isDragging = true;

    // Calcula a posição do mouse relativa ao canto superior esquerdo da div
    offsetX = event.clientX - div.offsetLeft;
    offsetY = event.clientY - div.offsetTop;
  }
});

window.addEventListener("mousemove", (event) => {
  if (isDragging && div) {
    const ReferenciaTopo = rel.offsetTop;
    const ReferenciaEsquerda = rel.offsetLeft;
    const ReferenciaDireita = ReferenciaEsquerda + rel.clientWidth;
    const ReferenciaBase = ReferenciaTopo + rel.clientHeight;

    // Calcula as novas posições da div
    let newLeft = event.clientX - offsetX;
    let newTop = event.clientY - offsetY;

    if (newLeft < ReferenciaEsquerda) {
      newLeft = ReferenciaEsquerda;
    }
    if (newLeft + div.offsetWidth > ReferenciaDireita) {
      newLeft = ReferenciaDireita - div.offsetWidth;
    }

    if (newTop < ReferenciaTopo) {
      newTop = ReferenciaTopo;
    }
    if (newTop + div.offsetHeight > ReferenciaBase) {
      newTop = ReferenciaBase - div.offsetHeight;
    }

    div.style.cursor = "grabbing";

    div.style.left = newLeft - ReferenciaEsquerda + "px";
    div.style.top = newTop - ReferenciaTopo + "px";
  }
});

window.addEventListener("mouseup", () => {
  remove();
  isDragging = false;
});
