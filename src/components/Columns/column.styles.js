// column.styles.js
import styled from "styled-components";

export const ColumnContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 24%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.12);
  }
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 6px;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 10px;

  h1 {
    font-size: 1.2rem;
    color: #333;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

export const AddButton = styled.button`
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.85rem;
  cursor: pointer;
  margin-bottom: 10px;
  transition: 0.2s;

  &:hover {
    background: #005bb5;
  }
`;

export const ColumnBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;
