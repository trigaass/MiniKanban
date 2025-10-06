import { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../cards";
import { CardInput } from "../cards/cardInput";
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from "../../api";

export const Column = ({ Title }) => {
  const [cards, setCards] = useState([]);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [Title]);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      const filtered = data.filter((t) => t.status === Title);
      setCards(filtered);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

const handleAdd = async (title, content) => {
  try {
    const created = await createTask(title, content, "Pendente");
    setCards([...cards, created]);
    setAdding(false);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
  }
};


  const handleDelete = async (id) => {
    await deleteTask(id);
    setCards(cards.filter((c) => c.id !== id));
  };

const handleStatusChange = async (id) => {
  const card = cards.find((c) => c.id === id);

  let nextStatus =
    card.status === "Pendente"
      ? "Em Andamento"
      : card.status === "Em Andamento"
      ? "Concluído"
      : "Pendente";

  const updated = await updateTaskStatus(id, nextStatus);
  setCards(cards.map((c) => (c.id === id ? { ...c, status: updated.status } : c)));
};

  const handleEdit = async (id, newTitle, newContent) => {
    const updated = await updateTask(id, newTitle, newContent);
    setCards(cards.map((c) => (c.id === id ? updated : c)));
  };

  return (
    <ColumnContainer>
      <ColumnHeader>
        <h1>{Title}</h1>
      </ColumnHeader>

      <AddButton onClick={() => setAdding(!adding)}>
        {adding ? "Cancelar" : "+ Adicionar Card"}
      </AddButton>

      <ColumnBody>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.description}
            status={card.status}
            onDelete={() => handleDelete(card.id)}
            onEdit={handleEdit}
            onStatusChange={() => handleStatusChange(card.id)}
          />
        ))}
        {adding && <CardInput onAdd={handleAdd} />}
      </ColumnBody>
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 24%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0,0,0,0.12);
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 6px;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 10px;

  h1 {
    font-size: 1.2rem;
    color: #333;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

const AddButton = styled.button`
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.85rem;
  cursor: pointer;
  margin-bottom: 10px;
  transition: 0.2s;

  &:hover {
    background: #005bb5;
  }
`;

const ColumnBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;
