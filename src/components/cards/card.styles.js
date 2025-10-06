// card.styles.js
import styled from "styled-components";

// 🔹 Estilos do CardInput
export const CardInputContainer = styled.div`
  background: #fafafa;
  border-radius: 12px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  padding: 12px;
  margin-bottom: 12px;
  border-left: 6px solid #3498db;
  display: flex;
  flex-direction: column;
  gap: 8px;

  input,
  textarea {
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

// 🔹 Estilos do Card
export const CardContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 12px;
  margin-bottom: 12px;
  border-left: 6px solid #3498db;
  transition: 0.2s;
`;

export const CardHeader = styled.div`
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

export const ActionButtons = styled.div`
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

export const CardContent = styled.div`
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

export const StatusTag = styled.span`
  display: inline-block;
  margin-top: 8px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  color: white;
  background: ${(p) =>
    p.status === "Concluído"
      ? "#2ecc71"
      : p.status === "Em Andamento"
      ? "#f1c40f"
      : "#3498db"};
`;
