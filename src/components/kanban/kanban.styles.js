// kanban.styles.js
import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(180deg, #f8f9fb 0%, #eef1f5 100%);
  font-family: "Inter", sans-serif;
`;

export const Header = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  color: #333;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

export const Columns = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex: 1;
  padding: 25px 40px;
  gap: 20px;
  overflow-x: auto;
`;

export const Column = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 30%;
  min-width: 280px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }

  h2 {
    text-align: center;
    margin-bottom: 12px;
    color: #333;
  }
`;
