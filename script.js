const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const scenarios = [
  {
    tag: "Código de confirmação",
    sender: "Suporte WhatsApp",
    status: "número desconhecido",
    messages: [
      "Olá! Detectamos erro na sua conta.",
      "Envie o código de 6 dígitos que chegou por SMS para evitar bloqueio."
    ],
    choices: [
      { text: "Enviar o código para resolver logo", type: "danger", score: -20, correct: false, explain: "Nunca compartilhe código de confirmação. Esse é um dos golpes mais perigosos." },
      { text: "Não enviar código, bloquear e denunciar", type: "safe", score: 25, correct: true, explain: "Correto. Código de confirmação é pessoal e não deve ser compartilhado." },
      { text: "Perguntar qual é o problema", type: "warn", score: 5, correct: false, explain: "Melhor não continuar conversa suspeita. Bloqueie e denuncie." }
    ]
  },
  {
    tag: "Pedido urgente de dinheiro",
    sender: "Novo número",
    status: "foto de familiar",
    messages: [
      "Oi, troquei de número. Sou eu!",
      "Preciso pagar uma conta agora. Faz um Pix urgente?"
    ],
    choices: [
      { text: "Transferir porque parece familiar", type: "danger", score: -20, correct: false, explain: "Golpistas usam foto e urgência. Sempre confirme por ligação ou pessoalmente." },
      { text: "Confirmar por ligação no número antigo ou com outro familiar", type: "safe", score: 25, correct: true, explain: "Perfeito. Pedido de dinheiro precisa de confirmação por outro meio." },
      { text: "Pedir a chave Pix primeiro", type: "warn", score: 0, correct: false, explain: "Ainda é arriscado. A atitude segura é confirmar fora da conversa." }
    ]
  },
  {
    tag: "Link com prêmio falso",
    sender: "Promoção Premiada",
    status: "encaminhada muitas vezes",
    messages: [
      "Parabéns! Você ganhou R$ 500 em vale-compras.",
      "Clique no link e preencha seus dados: premio-facil.agora.top"
    ],
    choices: [
      { text: "Clicar e preencher rápido", type: "danger", score: -20, correct: false, explain: "Links de prêmios fáceis podem roubar dados. Desconfie de promoções recebidas por mensagem." },
      { text: "Não clicar e apagar a mensagem", type: "safe", score: 25, correct: true, explain: "Correto. Não clique em link estranho, principalmente com prêmio ou urgência." },
      { text: "Enviar para amigos conferirem", type: "danger", score: -15, correct: false, explain: "Não repasse mensagens suspeitas. Isso espalha o golpe." }
    ]
  },
  {
    tag: "Falso banco",
    sender: "Atendimento Banco",
    status: "urgente",
    messages: [
      "Sua conta será bloqueada em 10 minutos.",
      "Acesse o link e confirme senha, CPF e código."
    ],
    choices: [
      { text: "Abrir o link para evitar bloqueio", type: "danger", score: -20, correct: false, explain: "Banco não deve pedir senha completa por link de mensagem. Procure canais oficiais." },
      { text: "Fechar a mensagem e acessar o app oficial do banco", type: "safe", score: 25, correct: true, explain: "Correto. Use o aplicativo oficial ou telefone oficial do banco." },
      { text: "Responder pedindo mais informações", type: "warn", score: 0, correct: false, explain: "Não continue conversa suspeita. Use canais oficiais." }
    ]
  },
  {
    tag: "Instalação suspeita",
    sender: "Atualização de Segurança",
    status: "arquivo anexado",
    messages: [
      "Instale este arquivo para proteger seu WhatsApp.",
      "É obrigatório para não perder sua conta."
    ],
    choices: [
      { text: "Instalar o arquivo recebido", type: "danger", score: -20, correct: false, explain: "Não instale arquivos enviados por desconhecidos. Pode ser malware." },
      { text: "Atualizar somente pela loja oficial do celular", type: "safe", score: 25, correct: true, explain: "Correto. Atualizações devem ser feitas pela loja oficial do aparelho." },
      { text: "Encaminhar para alguém testar primeiro", type: "danger", score: -15, correct: false, explain: "Não encaminhe arquivo suspeito. Isso pode prejudicar outras pessoas." }
    ]
  },
  {
    tag: "Falsa central de ajuda",
    sender: "Central de Segurança",
    status: "conta verificada?",
    messages: [
      "Para ativar a proteção, informe seu PIN de duas etapas.",
      "Sem isso sua conta pode ser suspensa hoje."
    ],
    choices: [
      { text: "Enviar o PIN para ativar proteção", type: "danger", score: -20, correct: false, explain: "PIN de duas etapas é secreto. Não compartilhe com ninguém." },
      { text: "Não informar PIN e encerrar conversa", type: "safe", score: 25, correct: true, explain: "Muito bem. PIN, senha e código são informações pessoais." },
      { text: "Enviar só parte do PIN", type: "warn", score: -10, correct: false, explain: "Mesmo parte do PIN não deve ser informada. Mantenha tudo em segredo." }
    ]
  },
  {
    tag: "Mensagem emocional",
    sender: "Ajuda urgente",
    status: "sem foto",
    messages: [
      "Estou no hospital e preciso de dinheiro agora.",
      "Não liga, só faz o Pix, depois explico."
    ],
    choices: [
      { text: "Ajudar imediatamente", type: "danger", score: -20, correct: false, explain: "Golpistas usam emoção e urgência. Confirme antes de transferir." },
      { text: "Ligar para a pessoa ou familiar antes de pagar", type: "safe", score: 25, correct: true, explain: "Correto. Emoção não deve substituir confirmação." },
      { text: "Pedir áudio provando quem é", type: "warn", score: 5, correct: false, explain: "Áudio pode enganar. O ideal é confirmar por ligação ou outro meio confiável." }
    ]
  },
  {
    tag: "Proteção final",
    sender: "Você mesmo",
    status: "configurações",
    messages: [
      "Você quer deixar sua conta mais segura.",
      "Qual ação ajuda a proteger contra invasões?"
    ],
    choices: [
      { text: "Ativar verificação em duas etapas com PIN", type: "safe", score: 25, correct: true, explain: "Excelente. A verificação em duas etapas adiciona uma camada de segurança." },
      { text: "Usar o mesmo PIN em tudo e contar para família", type: "warn", score: -5, correct: false, explain: "O PIN deve ser forte e secreto. Evite reutilizar senhas." },
      { text: "Desativar notificações de segurança", type: "danger", score: -15, correct: false, explain: "Notificações de segurança podem ajudar a perceber alterações importantes." }
    ]
  }
];

let current = 0;
let score = 0;
let lives = 3;
let playing = false;

const bestScore = Number(localStorage.getItem("guardioesBestScore") || 0);
$("#bestScore").textContent = bestScore;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function updateHUD() {
  $("#score").textContent = score;
  $("#lives").textContent = "❤️".repeat(Math.max(0, lives)) || "💔";
  $("#round").textContent = `${Math.min(current + 1, scenarios.length)}/${scenarios.length}`;
}

function renderScenario() {
  const scenario = scenarios[current];

  $("#scenarioTag").textContent = scenario.tag;
  $("#senderName").textContent = scenario.sender;
  $("#senderStatus").textContent = scenario.status;

  $("#messages").innerHTML = scenario.messages
    .map((message) => `<p class="bubble other">${message}</p>`)
    .join("");

  $("#choices").innerHTML = scenario.choices
    .map((choice, index) => `<button class="choice ${choice.type}" data-choice="${index}">${choice.text}</button>`)
    .join("");

  $$(".choice").forEach((button) => {
    button.addEventListener("click", () => answer(Number(button.dataset.choice)));
  });

  $("#feedback").textContent = "Escolha a atitude mais segura.";
  $("#feedback").className = "feedback";
  $("#coachText").textContent = "Procure sinais: urgência, link estranho, pedido de dinheiro, código ou PIN.";
  updateHUD();
}

function startGame() {
  current = 0;
  score = 0;
  lives = 3;
  playing = true;
  renderScenario();
  showToast("Treinamento iniciado.");
}

function answer(choiceIndex) {
  if (!playing) return;

  const scenario = scenarios[current];
  const choice = scenario.choices[choiceIndex];

  score = Math.max(0, score + choice.score);

  if (!choice.correct) {
    lives -= 1;
  }

  $("#feedback").textContent = choice.explain;
  $("#feedback").className = `feedback ${choice.correct ? "ok" : "bad"}`;
  $("#coachText").textContent = choice.correct
    ? "Boa! Você escolheu uma atitude segura."
    : "Atenção: golpe usa pressa, medo e promessa fácil para fazer a pessoa agir sem pensar.";

  $$(".choice").forEach((button) => button.disabled = true);
  updateHUD();

  setTimeout(() => {
    if (lives <= 0) {
      finishGame(false);
      return;
    }

    current += 1;

    if (current >= scenarios.length) {
      finishGame(true);
    } else {
      renderScenario();
    }
  }, 1500);
}

function finishGame(completed) {
  playing = false;

  const oldBest = Number(localStorage.getItem("guardioesBestScore") || 0);
  if (score > oldBest) {
    localStorage.setItem("guardioesBestScore", String(score));
    $("#bestScore").textContent = score;
  }

  localStorage.setItem("guardioesLastScore", String(score));
  localStorage.setItem("guardioesCompleted", completed ? "true" : "false");

  $("#messages").innerHTML = completed
    ? `<p class="bubble me">Parabéns! Você concluiu o treinamento anti-golpe.</p>`
    : `<p class="bubble other">Você perdeu as vidas, mas pode tentar novamente e aprender com os sinais.</p>`;

  $("#choices").innerHTML = `<button class="choice safe" id="restartGame">Jogar novamente</button>`;
  $("#restartGame").addEventListener("click", startGame);

  $("#feedback").textContent = completed
    ? `Treinamento concluído com ${score} pontos.`
    : `Fim de jogo. Pontuação: ${score}. Tente novamente.`;

  updateCertificate();
  location.hash = "#certificado";
}

function updateCertificate() {
  const completed = localStorage.getItem("guardioesCompleted") === "true";
  const lastScore = Number(localStorage.getItem("guardioesLastScore") || 0);

  if (completed) {
    $("#certificateTitle").textContent = "Guardião Digital em treinamento";
    $("#certificateText").textContent =
      `Treinamento concluído com ${lastScore} pontos. A pessoa demonstrou aprendizagem sobre links suspeitos, códigos de confirmação, pedidos de dinheiro e verificação em duas etapas.`;
  } else {
    $("#certificateTitle").textContent = "Treinamento ainda não concluído";
    $("#certificateText").textContent =
      "Complete as missões para liberar seu certificado simbólico de Guardião Digital.";
  }
}

$("#startGame").addEventListener("click", startGame);

$("#largeMode").addEventListener("click", () => {
  document.body.classList.toggle("large");
  $("#largeMode").textContent = document.body.classList.contains("large")
    ? "Desativar letras grandes"
    : "Ativar letras grandes";
});

$$(".learn-card").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("flipped"));
});

const checklistInputs = $$("#checklist input");
function updateRisk() {
  const checked = checklistInputs.filter((input) => input.checked).length;
  const percent = Math.round((checked / checklistInputs.length) * 100);

  $("#riskBar").style.width = `${percent}%`;

  if (checked === 0) {
    $("#riskText").textContent = "Marque os itens para avaliar o risco.";
  } else if (checked <= 2) {
    $("#riskText").textContent = "Risco baixo ou em análise. Continue verificando antes de responder.";
  } else if (checked <= 4) {
    $("#riskText").textContent = "Atenção: existem sinais de golpe. Não aja com pressa.";
  } else {
    $("#riskText").textContent = "Alto risco: não clique, não pague, não envie código. Bloqueie e denuncie.";
  }
}
checklistInputs.forEach((input) => input.addEventListener("change", updateRisk));

$("#copyCertificate").addEventListener("click", async () => {
  const text = `${$("#certificateTitle").textContent}\n\n${$("#certificateText").textContent}\n\nJogo educativo: Guardiões do Zap.`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Conclusão copiada.");
  } catch {
    showToast("Não foi possível copiar automaticamente.");
  }
});

$("#resetProgress").addEventListener("click", () => {
  localStorage.removeItem("guardioesCompleted");
  localStorage.removeItem("guardioesLastScore");
  updateCertificate();
  showToast("Progresso resetado.");
});

$("#menuBtn").addEventListener("click", () => $("#nav").classList.toggle("open"));
$$(".nav a").forEach((link) => {
  link.addEventListener("click", () => $("#nav").classList.remove("open"));
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }),
  { threshold: 0.14 }
);
$$(".reveal").forEach((element) => observer.observe(element));

/* Background canvas */
const canvas = $("#bgCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particles = Array.from({ length: Math.min(120, Math.floor(window.innerWidth / 9)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.4,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    a: Math.random() * 0.5 + 0.2,
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(187, 247, 208, ${p.a})`;
    ctx.fill();

    for (let j = index + 1; j < particles.length; j++) {
      const q = particles[j];
      const distance = Math.hypot(p.x - q.x, p.y - q.y);
      if (distance < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(37, 211, 102, ${0.07 * (1 - distance / 110)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
draw();
updateCertificate();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
