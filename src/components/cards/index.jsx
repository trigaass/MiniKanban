import { useState } from "react";
import styled from "styled-components";

export const Card = ({ id, title, content, status, onDelete, onEdit, onStatusChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);

    const handleSave = () => {
        onEdit(id, newTitle, newContent);  // ✅ Agora passa o ID
        setIsEditing(false);
    };

    return (
        <CardContainer status={status}>
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

                <CardActions>
                    {isEditing ? (
                        <button onClick={handleSave}>Salvar</button>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)}>Editar</button>
                            <button onClick={onDelete}>Excluir</button>
                        </>
                    )}
                    <button onClick={onStatusChange}>
                        Mudar Status
                    </button>
                </CardActions>
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  padding: 10px;
  margin: 10px 0;
  border-left: 6px solid ${({ status }) =>
    status === "pendente"
      ? "#f39c12"
      : status === "concluído"
      ? "#2ecc71"
      : "#3498db"};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 6px;

  button {
    border: none;
    background: #eee;
    padding: 4px 6px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const CardContent = styled.div`
  margin-top: 8px;

  textarea {
    width: 100%;
    height: 60px;
  }
`;

const Flags = styled.div`
  text-align: right;
  margin-top: 5px;
  span {
    font-size: 0.9rem;
    font-weight: bold;
    color: #555;
  }
`;