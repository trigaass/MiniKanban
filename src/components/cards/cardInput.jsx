import { useState } from "react";
import { CardInputContainer } from "./card.styles";

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
    <CardInputContainer>
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
    </CardInputContainer>
  );
};
