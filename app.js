// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const errorMessage = document.getElementById("errorMessage");
    const nome = input.value.trim();

    // Verifica se o nome está vazio
    if (nome === "") {
        showError("Por favor, insira um nome para continuar!");
        return;
    }

    // Verifica se o nome já existe (case-insensitive)
    if (amigos.some(amigo => amigo.toLowerCase() === nome.toLowerCase())) {
        showError("Este nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    input.value = ""; // Limpa o campo de entrada
    atualizarLista(); // Atualiza a lista visível
    errorMessage.classList.add("hidden"); // Esconde mensagem de erro
}

// Função para mostrar mensagens de erro na tela
function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    setTimeout(() => errorMessage.classList.add("hidden"), 3000); // Esconde após 3 segundos
}

// Função para atualizar a lista de amigos na tela
function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    const contador = document.getElementById("contadorAmigos");
    lista.innerHTML = ""; // Limpa a lista antes de atualizar

    for (let i = 0; i < amigos.length; i++) {
        const item = document.createElement("li");
        item.textContent = amigos[i];
        lista.appendChild(item);
    }

    // Atualiza o contador e exibe a lista com transição
    contador.textContent = amigos.length;
    lista.classList.add("show");
}

// Função para limpar a lista de amigos
function limparLista() {
    amigos = [];
    atualizarLista();
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.remove("show");
    showError("Lista de amigos limpa com sucesso!");
}

// Função para sortear amigos secretamente
// Cada pessoa tira outra, sem tirar a si mesma
function sortearAmigo() {
    const resultado = document.getElementById("resultado");
    const errorMessage = document.getElementById("errorMessage");
    resultado.innerHTML = ""; // Limpa o resultado anterior

    if (amigos.length < 2) {
        showError("Adicione pelo menos 2 nomes para sortear!");
        return;
    }

    // Embaralha a lista de amigos
    let shuffled = [...amigos];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Verifica se alguém tirou a si mesmo
    let resultados = [];
    for (let i = 0; i < amigos.length; i++) {
        if (shuffled[i] === amigos[i]) {
            sortearAmigo(); // Tenta novamente se alguém tirou a si mesmo
            return;
        }
        resultados.push({ doador: amigos[i], receptor: shuffled[i] });
    }

    // Exibe mensagem de confirmação e resultados
    showError("Sorteio realizado com sucesso!");
    const resultadoList = document.getElementById("resultado"); // Captura o elemento <ul>
    resultados.forEach(resultado => {
        const itemResultado = document.createElement("li");
        itemResultado.textContent = `${resultado.doador} tirou ${resultado.receptor}`;
        resultadoList.appendChild(itemResultado); // Adiciona ao <ul> corretamente
    });
    resultadoList.classList.add("show");
}

// Evento para adicionar amigo ao pressionar Enter
document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});

// Comentário: Este programa tambem pode ser usado como uma atividade pedagógica na EPT,
// promovendo integração entre alunos por meio de metodologias ativas, como
// atividades lúdicas que estimulam engajamento e interação social.