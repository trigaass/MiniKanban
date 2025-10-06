import styled from "styled-components";
import { Column } from "./column";

export const Kanban = () => {
  return (
    <Page>
      <Header>
        <Logo src="/src/assets/logo.png" alt="app logo" />
        <Title>Bem-vindo!</Title>
      </Header>

      <KanbanContainer>
        <Column Title="Iniciado" />
        <Column Title="aguardando revisão" />
        <Column Title="em atualização" />
        <Column Title="para entrega" />
      </KanbanContainer>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(180deg, #f8f9fb 0%, #eef1f5 100%);
  font-family: "Inter", sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  color: #333;
  font-weight: 600;
`;

const KanbanContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  padding: 25px 40px;
  flex: 1;
  overflow-x: auto;
`;
