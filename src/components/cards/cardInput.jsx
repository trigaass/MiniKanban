import { useState } from "react";
import styled from "styled-components";

export const CardInput = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSave = () => {
        if (title.trim() && content.trim()) {
            onAdd(title, content);
            setTitle("");
            setContent("");
        }
    };

    return (
        <CardContainer>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título..."
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Descrição..."
            />
            <button onClick={handleSave}>Salvar</button>
        </CardContainer>
    );
};

const CardContainer = styled.div`
  background: #fafafa;
  border-radius: 12px;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.1);
  padding: 12px;
  margin-bottom: 12px;
  border-left: 6px solid #3498db;
  display: flex;
  flex-direction: column;
  gap: 8px;

  input, textarea {
    width: 100%;
    font-size: 0.95rem;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 6px;
    background: transparent;
    outline: none;
  }

  textarea {
    height: 70px;
    border: 1px solid #ddd;
    border-radius: 6px;
    resize: vertical;
    background: #fff;
  }

  button {
    align-self: flex-end;
    background: #27ae60;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #219150;
    }
  }
`;
