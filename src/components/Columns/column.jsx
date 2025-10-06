import { useEffect, useState } from "react";
import { Card } from "../cards/cards";
import { CardInput } from "../cards/cardInput";
import {
  ColumnContainer,
  ColumnHeader,
  AddButton,
  ColumnBody,
} from "./column.styles";
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../../api";

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
            onNextStatus={() => handleStatusChange(card.id)}
          />
        ))}
        {adding && <CardInput onAdd={handleAdd} />}
      </ColumnBody>
    </ColumnContainer>
  );
};
