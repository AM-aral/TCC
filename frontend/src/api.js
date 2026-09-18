const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export function getToken() {
  return localStorage.getItem("token");
}

export function getUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    return null;
  }
}

export function salvarUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

// =====================================================
// CONTAS SALVAS (troca de conta)
// =====================================================

export function getContasSalvas() {
  try {
    return JSON.parse(localStorage.getItem("contasSalvas") || "[]");
  } catch {
    return [];
  }
}

function salvarContas(lista) {
  localStorage.setItem("contasSalvas", JSON.stringify(lista));
}

// Salva a conta logada no momento na lista de contas salvas.
export function salvarContaAtual() {
  const token = getToken();

  const usuario = getUsuario();

  if (!token || !usuario?.id) {
    return;
  }

  const outras = getContasSalvas().filter(
    (conta) => String(conta.id) !== String(usuario.id)
  );

  salvarContas([
    {
      id: usuario.id,
      token,
      usuario,
      ultimoAcesso: new Date().toISOString()
    },
    ...outras
  ]);
}

// Troca a sessão atual para outra conta salva.
export function trocarConta(contaId) {
  const conta = getContasSalvas().find(
    (item) => String(item.id) === String(contaId)
  );

  if (!conta?.token || !conta?.usuario) {
    return false;
  }

  localStorage.setItem("token", conta.token);

  salvarUsuario(conta.usuario);

  return true;
}

// Remove uma conta salva (não afeta a sessão atual).
export function removerConta(contaId) {
  const lista = getContasSalvas().filter(
    (conta) => String(conta.id) !== String(contaId)
  );

  salvarContas(lista);
}

export async function apiFetch(caminho, opcoes = {}) {
  const headers = { ...(opcoes.headers || {}) };

  if (opcoes.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...opcoes,
    headers
  });

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    const erro = new Error(
      dados?.mensagem || "Não foi possível conectar ao servidor."
    );

    erro.status = resposta.status;

    throw erro;
  }

  return dados;
}

export { API_URL };
