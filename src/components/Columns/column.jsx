import { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../cards";
import { CardInput } from "../cards/cardInput";
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from "../../api";

export const Column = ({ Title }) => {
  const [cards, setCards] = useState([]);
  const [adding, setAdding] = useState(false);

  const statusMap = {
    "Pendente": "Pendente",
    "Em Andamento": "Em Andamento",
    "Concluído": "Concluído"
  };

  useEffect(() => {
    loadTasks();
  }, [Title]);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      const backendStatus = statusMap[Title] || Title;
      const filtered = data.filter(
        (t) => t.status === backendStatus
      );
      setCards(filtered);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const handleAdd = async (title, content) => {
    try {
      const backendStatus = statusMap[Title] || "Pendente";
      const created = await createTask(title, content, backendStatus);
      setCards([...cards, created]);
      setAdding(false);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setCards(cards.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      const card = cards.find((c) => c.id === id);
      const nextStatus =
        card.status === "Pendente"
          ? "Em Andamento"
          : card.status === "Em Andamento"
          ? "Concluído"
          : "Pendente";

      const updated = await updateTaskStatus(id, nextStatus);
      // ✅ Atualiza o status do card sem removê-lo
      setCards(cards.map((c) => 
        c.id === id 
          ? { ...c, status: updated.status }
          : c
      ));
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleEdit = async (id, newTitle, newContent) => {
    try {
      const updated = await updateTask(id, newTitle, newContent);
      setCards(cards.map((c) => 
        c.id === id 
          ? { ...c, title: updated.title, description: updated.description }
          : c
      ));
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  return (
    <ColumnContainer>
      <ColumnHeader>
        <h1>{Title}</h1>
        <button onClick={() => setAdding(!adding)}>
          {adding ? "Cancelar" : "Adicionar Card"}
        </button>
      </ColumnHeader>

      <ColumnBody>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}  // ✅ Passa o ID
            title={card.title}
            content={card.description}
            status={card.status}
            onDelete={() => handleDelete(card.id)}
            onEdit={handleEdit}  // ✅ Passa a função de edição
            onStatusChange={() => handleStatusChange(card.id)}
          />
        ))}
        {adding && <CardInput onAdd={handleAdd} />}
      </ColumnBody>
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  background: #f4f4f4;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background: #27ae60;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const ColumnBody = styled.div`
  margin-top: 10px;
  flex: 1;
  overflow-y: auto;
`;