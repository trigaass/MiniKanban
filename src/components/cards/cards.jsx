import { useState } from "react";
import {
  CardContainer,
  CardHeader,
  ActionButtons,
  CardContent,
  StatusTag,
} from "./card.styles";

export const Card = ({ id, title, content, status, onDelete, onEdit, onNextStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleSave = () => {
    onEdit(id, newTitle, newContent);
    setIsEditing(false);
  };

  return (
    <CardContainer>
      <CardHeader>
        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título..."
          />
        ) : (
          <h3>{title}</h3>
        )}

        <ActionButtons>
          {isEditing ? (
            <button onClick={handleSave}>Salvar</button>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button onClick={onDelete}>Excluir</button>
              <button onClick={onNextStatus}>Alterar status</button>
            </>
          )}
        </ActionButtons>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Descrição..."
          />
        ) : (
          <p>{content}</p>
        )}
      </CardContent>

      <StatusTag status={status}>{status}</StatusTag>
    </CardContainer>
  );
};
