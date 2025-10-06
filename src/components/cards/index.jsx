import { useState } from "react";
import styled from "styled-components";

export const Card = ({ id, title, content, status, onDelete, onEdit, onStatusChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleSave = () => {
    onEdit(id, newTitle, newContent);
    setIsEditing(false);
  };

  const getBorderColor = (status) => {
    switch (status) {
      case "Pendente":
        return "#3498db";
      case "Em Andamento":
        return "#f1c40f";
      case "Concluído":
        return "#2ecc71";
      default:
        return "#ccc";
    }
  };

  return (
    <CardContainer borderColor={getBorderColor(status)}>
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
              <button onClick={onStatusChange}>Mudar Status</button>
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

      <Flags>
        <span>{status}</span>
      </Flags>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  padding: 12px;
  margin-bottom: 12px;
  border-left: 6px solid ${({ borderColor }) => borderColor};
  transition: 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  }

  h3 {
    font-size: 1rem;
    color: #333;
    margin: 0;
  }

  p {
    font-size: 0.9rem;
    color: #555;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;

  input {
    flex: 1;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 6px;

  button {
    border: none;
    background: #f0f0f0;
    color: #333;
    padding: 5px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #ddd;
    }
  }
`;

const CardContent = styled.div`
  margin-top: 8px;

  textarea {
    width: 100%;
    height: 60px;
    border-radius: 6px;
    border: 1px solid #ccc;
    padding: 6px;
    resize: vertical;
  }
`;

const Flags = styled.div`
  text-align: right;
  margin-top: 8px;

  span {
    font-size: 0.8rem;
    font-weight: bold;
    color: #666;
  }
`;
