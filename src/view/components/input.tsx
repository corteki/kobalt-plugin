import styled from "styled-components";

export const Input = styled.input`
  grid-column-start: 1;
  grid-column-end: span 28;
  border: 1px solid ${({ theme }) => theme.color.border.value};
  color: ${({ theme }) => theme.color.text.value};
  fill: ${({ theme }) => theme.color.icon.value};
  border-radius: 2px;
  cursor: default;
  background-clip: padding-box;
  background-color: transparent;
  box-sizing: border-box;
  position: relative;
  height: ${({ theme }) => theme.sizes.xxl}px;
  width: 100%;
  min-width: 0;
  margin-bottom: ${({ theme }) => theme.sizes.lg}px;
  padding: 0 0 0 7px;
  padding-right: 7px;
  background-clip: padding-box;
  :focus-visible {
    border: 1px solid ${({ theme }) => theme.color.border.selected.value};
    outline: 1px solid ${({ theme }) => theme.color.border.selected.value};
    outline-offset: -2px;
  }
`;
