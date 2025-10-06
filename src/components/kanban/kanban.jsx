import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../../api";
import { Card } from "../cards/cards";
import { CardInput } from "../cards/cardInput";
import { Page, Header, Columns, Column } from "./kanban.styles";

export const Kanban = () => {
  const [tasks, setTasks] = useState({
    Pendente: [],
    "Em Andamento": [],
    Concluído: [],
  });

  // 🔹 Carrega as tarefas na montagem
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      const grouped = {
        Pendente: data.filter((t) => t.status === "Pendente"),
        "Em Andamento": data.filter((t) => t.status === "Em Andamento"),
        Concluído: data.filter((t) => t.status === "Concluído"),
      };
      setTasks(grouped);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const handleAdd = async (title, content) => {
    const created = await createTask(title, content, "Pendente");
    setTasks((prev) => ({
      ...prev,
      Pendente: [...prev.Pendente, created],
    }));
  };

  const handleEdit = async (id, title, description) => {
    await updateTask(id, title, description);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  // 🔹 Lógica do botão de “Avançar status”
  const handleNextStatus = async (task) => {
    let nextStatus =
      task.status === "Pendente"
        ? "Em Andamento"
        : task.status === "Em Andamento"
        ? "Concluído"
        : "Pendente";

    await updateTaskStatus(task.id, nextStatus);
    loadTasks();
  };

  return (
    <Page>
      <Header>📋 Quadro de Tarefas</Header>

      <Columns>
        {Object.keys(tasks).map((colKey) => (
          <Column key={colKey}>
            <h2>{colKey}</h2>

            {tasks[colKey].map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                content={task.description}
                status={task.status}
                onDelete={() => handleDelete(task.id)}
                onEdit={handleEdit}
                onNextStatus={() => handleNextStatus(task)}
              />
            ))}

            {colKey === "Pendente" && <CardInput onAdd={handleAdd} />}
          </Column>
        ))}
      </Columns>
    </Page>
  );
};
