import styled from "styled-components";

export const Error = styled.div`
  padding: ${({ theme }) => theme.sizes.md}px;
  color: ${({ theme }) => theme.color.text.ondanger.value};
  background-color: ${({ theme }) => theme.color.bg.danger.value};
`;
