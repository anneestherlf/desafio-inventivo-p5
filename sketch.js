
let inputNaoLinear, inputLinear;
let btnComparar, dropdownEl;

// Valores animados
let valorNaoLinear = 50;
let valorLinear = 25;
let valorDiff = 25;
let animandoGrafico = false;
let progresso = 0;
let alvoNaoLinear = 50;
let alvoLinear = 25;
let mesSelecionado = 'Abril';

const MESES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
];

// Cores
const COR_BARRA_NL    = [180, 155, 80];
const COR_BARRA_L     = [140, 145, 155];
const COR_BARRA_DIFF  = [74, 127, 193];
const COR_BTN         = [45, 60, 90];
const COR_TEXTO       = [50, 55, 65];
const COR_MUTED       = [130, 135, 145];

function setup() {
  let canvas = createCanvas(390, 660);
  canvas.parent('canvas-container');

  inputNaoLinear = createInput('50');
  inputNaoLinear.parent('canvas-container');
  inputNaoLinear.class('campo-input');
  inputNaoLinear.id('inp-nl');

  inputLinear = createInput('25');
  inputLinear.parent('canvas-container');
  inputLinear.class('campo-input');
  inputLinear.id('inp-l');

  btnComparar = createButton('Comparar');
  btnComparar.parent('canvas-container');
  btnComparar.class('btn-comparar');
  btnComparar.mousePressed(comparar);

  dropdownEl = createSelect();
  dropdownEl.parent('canvas-container');
  dropdownEl.class('dropdown-sel');
  MESES.forEach((m, i) => {
    dropdownEl.option(m);
    if (m === 'Abril') dropdownEl.selected(m);
  });
  dropdownEl.changed(() => {
    mesSelecionado = dropdownEl.value();
  });

  posicionarElementos();
  textFont('DM Sans, system-ui, sans-serif');
}

function posicionarElementos() {
  let inp = document.getElementById('inp-nl');
  inp.style.position = 'absolute';
  inp.style.left = '24px';
  inp.style.top = '140px';
  inp.style.width = '155px';

  let inpL = document.getElementById('inp-l');
  inpL.style.position = 'absolute';
  inpL.style.left = '205px';
  inpL.style.top = '140px';
  inpL.style.width = '155px';

  let btn = document.querySelector('.btn-comparar');
  btn.style.position = 'absolute';
  btn.style.left = '24px';
  btn.style.top = '196px';
  btn.style.width = '155px';

  let dd = document.querySelector('.dropdown-sel');
  dd.style.position = 'absolute';
  dd.style.left = '205px';
  dd.style.top = '196px';
  dd.style.width = '155px';
}

function comparar() {
  let vNL = parseFloat(inputNaoLinear.value());
  let vL = parseFloat(inputLinear.value());
  if (isNaN(vNL) || isNaN(vL)) return;
  alvoNaoLinear = vNL;
  alvoLinear = vL;
  animandoGrafico = true;
  progresso = 0;
  valorNaoLinear = 0;
  valorLinear = 0;
  valorDiff = 0;
}

function easeOut(t) {
  return 1 - pow(1 - t, 3);
}

function draw() {
  background(255);

  // Título
  fill(COR_TEXTO);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(17);
  textStyle(BOLD);
  text("Comparação de limite de crédito", width / 2, 24);
  text("concedido em " + mesSelecionado, width / 2, 46);

  // Labels inputs
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(NORMAL);
  fill(COR_MUTED);
  text("Modelo Não-Linear:", 24, 118);
  text("Modelo Linear:", 205, 118);

  // Animação suave
  if (animandoGrafico) {
    progresso += 0.04;
    if (progresso >= 1) {
      progresso = 1;
      animandoGrafico = false;
      valorNaoLinear = alvoNaoLinear;
      valorLinear = alvoLinear;
      valorDiff = abs(alvoNaoLinear - alvoLinear);
    } else {
      let t = easeOut(progresso);
      valorNaoLinear = lerp(0, alvoNaoLinear, t);
      valorLinear = lerp(0, alvoLinear, t);
      valorDiff = lerp(0, abs(alvoNaoLinear - alvoLinear), t);
    }
  }

  // Área do gráfico
  let gx = 20, gy = 252, gw = width - 40, gh = height - 270;
  fill(248);
  stroke(225);
  strokeWeight(1);
  rect(gx, gy, gw, gh, 12);

  // Diferença label
  let dif = alvoNaoLinear - alvoLinear;
  desenharDiferenca(dif, gx, gy + 14, gw);

  // Gráfico
  desenharGrafico(gx + 10, gy + 44, gw - 20, gh - 64, valorNaoLinear, valorLinear, valorDiff);

  // Legenda
  desenharLegenda(gx, gy + gh - 24, gw);
}

function desenharDiferenca(dif, x, y, w) {
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(NORMAL);
  noStroke();

  let sinal = dif >= 0 ? "+" : "";
  let valor = sinal + round(dif);
  let difAbs = abs(dif);
  let corDif, classeLabel;

  if (difAbs <= 20)      { corDif = color(59, 109, 17);  classeLabel = "(baixa)"; }
  else if (difAbs <= 40) { corDif = color(186, 117, 23); classeLabel = "(média)"; }
  else                   { corDif = color(163, 45, 45);  classeLabel = "(alta)";  }

  fill(COR_TEXTO);
  let labelStr = "Diferença: ";
  let valorStr = valor + " " + classeLabel;
  let totalW = textWidth(labelStr + valorStr);
  let startX = x + w / 2 - totalW / 2;

  text(labelStr, startX + textWidth(labelStr) / 2, y);
  fill(corDif);
  text(valorStr, startX + textWidth(labelStr) + textWidth(valorStr) / 2, y);
}

function desenharGrafico(x, y, w, h, vNL, vL, vDiff) {
  let maxVal = max(max(vNL, vL, vDiff) * 1.25, 60);
  let pLeft = 70, pBottom = 22, pRight = 32, pTop = 4;
  let px = x + pLeft, py = y + pTop;
  let pw = w - pLeft - pRight, ph = h - pBottom - pTop;

  // Grade e eixo X
  let steps = 5;
  textSize(10);
  textAlign(CENTER, TOP);
  fill(COR_MUTED);
  noStroke();
  for (let i = 0; i <= steps; i++) {
    let xPos = px + (pw / steps) * i;
    let lv = round((maxVal / steps) * i);
    text(lv, xPos, py + ph + 5);
    stroke(225);
    strokeWeight(0.5);
    line(xPos, py, xPos, py + ph);
  }

  // 3 barras: NL, Linear, Diferença
  let barH = ph / 5;
  let gap = (ph - barH * 3) / 4;
  let labels = ['Não-Linear', 'Linear', 'Diferença'];
  let vals = [vNL, vL, vDiff];
  let cores = [COR_BARRA_NL, COR_BARRA_L, COR_BARRA_DIFF];

  for (let i = 0; i < 3; i++) {
    let by = py + gap + i * (barH + gap);
    let bw = map(vals[i], 0, maxVal, 0, pw);

    // Barra
    fill(cores[i]);
    noStroke();
    rect(px, by, bw, barH, 3);

    // Label eixo Y
    textAlign(RIGHT, CENTER);
    textSize(11);
    fill(COR_TEXTO);
    text(labels[i], px - 6, by + barH / 2);

    // Valor à direita
    textAlign(LEFT, CENTER);
    fill(COR_TEXTO);
    text(round(vals[i]), px + bw + 5, by + barH / 2);
  }

  // Eixo vertical
  stroke(210);
  strokeWeight(1);
  line(px, py, px, py + ph);
}

function desenharLegenda(x, y, w) {
  let itens = [
    { label: 'Não-Linear', cor: COR_BARRA_NL },
    { label: 'Linear',     cor: COR_BARRA_L  },
    { label: 'Diferença',  cor: COR_BARRA_DIFF }
  ];
  let totalW = 0;
  textSize(11);
  itens.forEach(it => { totalW += 14 + textWidth(it.label) + 16; });
  let startX = x + w / 2 - totalW / 2;
  let cx = startX;

  noStroke();
  itens.forEach(it => {
    fill(it.cor);
    rect(cx, y, 10, 10, 2);
    fill(COR_MUTED);
    textAlign(LEFT, CENTER);
    text(it.label, cx + 13, y + 5);
    cx += 13 + textWidth(it.label) + 16;
  });
}
