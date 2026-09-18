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
