let tasks = [];
let nextId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

const VALID_STATUSES = ["Pendente", "Em Andamento", "Concluído"];

export const getTasks = (req, res) => {
    return res.status(200).json(tasks);
};

export const createTask = (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "O título e a descrição são obrigatórios." });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    status: status || "Pendente",
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const taskId = parseInt(id, 10);

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: `Tarefa com ID ${id} não encontrada.` });
    }

    if (title !== undefined) {
        tasks[taskIndex].title = title.trim();
    }
    
    if (description !== undefined) {
        tasks[taskIndex].description = description.trim();
    }

    return res.status(200).json(tasks[taskIndex]);
};

export const updateTaskStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const taskId = parseInt(id, 10);

    if (!status || !VALID_STATUSES.includes(status)) {
        return res.status(400).json({
            message: `O status é obrigatório e deve ser um dos seguintes: ${VALID_STATUSES.join(', ')}.`
        });
    }

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: `Tarefa com ID ${id} não encontrada.` });
    }

    tasks[taskIndex].status = status;

    return res.status(200).json(tasks[taskIndex]);
};

export const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskId = parseInt(id, 10);

    const initialLength = tasks.length;

    tasks = tasks.filter(t => t.id !== taskId);

    if (tasks.length === initialLength) {
        return res.status(404).json({ message: `Tarefa com ID ${id} não encontrada.` });
    }

    return res.status(204).send();
};