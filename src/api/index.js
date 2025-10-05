const API_URL = "http://localhost:3001/tasks";

export const getTasks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar tarefas");
  return res.json();
};

export const createTask = async (title, description, status = "Pendente") => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, status }),
  });
  if (!res.ok) throw new Error("Erro ao criar tarefa");
  return res.json();
};

export const updateTask = async (id, title, description) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) throw new Error("Erro ao atualizar tarefa");
  return res.json();
};

export const updateTaskStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Erro ao atualizar status");
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error("Erro ao deletar tarefa");
  return true;
};