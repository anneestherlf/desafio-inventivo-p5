
let l = 25, nl = 50;
let selMonth, inpL, inpNL, btn;

function setup() {
  let canvas = createCanvas(320, 300);
  canvas.parent('p5-canvas');
  
  // Referências aos elementos do DOM para sincronizar com o p5
  selMonth = select('#selMonth');
  inpL = select('#lVal');
  inpNL = select('#nlVal');
  btn = select('#btnComparar');
  
  btn.mousePressed(updateData);
  noLoop();
}

function draw() {
  background(255);
  let m = 45;
  let w = width - m*1.5;
  let h = height - m*1.5;
  
  // Grid
  stroke(245);
  for(let i=0; i<=6; i++) {
    let x = map(i*10, 0, 60, m, m+w);
    let y = map(i*10, 0, 60, m+h, m);
    line(x, m, x, m+h); line(m, y, m+w, y);
    fill(150); noStroke(); textAlign(CENTER); textSize(10);
    text(i*10, x, m+h+15); textAlign(RIGHT); text(i*10, m-10, y+4);
    stroke(245);
  }

  // Barras baseadas na imagem de referência
  noStroke();
  let bw = 40; 
  
  // 1. Modelo Não-Linear (Topo - Dourado Escuro)
  fill(204, 164, 82); 
  rect(m, m+25, map(nl, 0, 60, 0, w), bw, 5);
  
  // 2. Modelo Não-Linear (Meio - Dourado Claro)
  fill(235, 212, 160);
  rect(m, m+95, map(nl, 0, 60, 0, w), bw, 5);
  
  // 3. Modelo Linear (Base - Cinza Azulado)
  fill(158, 167, 181);
  rect(m, m+165, map(l, 0, 60, 0, w), bw, 5);

  // Labels dos valores
  fill(50); textAlign(LEFT);
  text(nl, m + map(nl, 0, 60, 0, w) + 10, m+50);
  text(nl, m + map(nl, 0, 60, 0, w) + 10, m+120);
  text(l, m + map(l, 0, 60, 0, w) + 10, m+190);
}

function updateData() {
  l = float(inpL.value());
  nl = float(inpNL.value());
  let d = nl - l;
  select('#diffText').html((d>=0?"+":"")+d+" (média)");
  redraw();
}
