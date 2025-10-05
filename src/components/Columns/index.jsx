import styled from "styled-components";
import { Column } from "./column";

export const Kanban = () => {
    return (
        <KanbanContainer>
            <Column Title="Pendente" />
            <Column Title="Em Andamento" />
            <Column Title="Concluído" />
        </KanbanContainer>
    );
};

const KanbanContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: #ecf0f1;
  height: 100vh;
  overflow-x: auto;
`;