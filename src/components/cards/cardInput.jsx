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
            <CardHeader>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título..."
                />
                <button onClick={handleSave}>Salvar</button>
            </CardHeader>

            <CardContent>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Descrição..."
                />
            </CardContent>
        </CardContainer>
    );
};

const CardContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  padding: 10px;
  margin: 10px 0;
  border-left: 6px solid #95a5a6;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    flex: 1;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 5px;
  }

  button {
    border: none;
    background: #27ae60;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 10px;
  }
`;

const CardContent = styled.div`
  margin-top: 8px;

  textarea {
    width: 100%;
    height: 60px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
`;