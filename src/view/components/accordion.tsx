import { ReactNode, useState } from "react";
import styled from "styled-components";

type AccordionProps = {
  title: string;
  children?: ReactNode;
};

const AccordionContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(56, ${({ theme }) => theme.sizes.md}px);
  padding-left: ${({ theme }) => theme.sizes.md}px;
  padding-right: ${({ theme }) => theme.sizes.md}px;
  align-items: center;
  position: relative;
`;

const IconContainer = styled.span`
  grid-column-end: span 2;
  margin-bottom: ${({ theme }) => theme.sizes.xl}px;
  padding-left: ${({ theme }) => theme.sizes.md}px;
  fill: ${({ theme }) => theme.color.icon.value};
  color: ${({ theme }) => theme.color.icon.value};
`;

const ChevronIcon = () => (
  <svg className="svg" width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3L1 0v6l4-3z" fill-rule="nonzero" fill-opacity="1" stroke="none"></path>
  </svg>
);

const AccordionTitle = styled.label`
  grid-column-end: 29;
  grid-column-start: 4;
  margin-bottom: ${({ theme }) => theme.sizes.xl}px;
  color: ${({ theme }) => theme.color.text.value};
  fill: ${({ theme }) => theme.color.icon.value};
  border-radius: 2px;
  cursor: default;
  box-sizing: border-box;
  background-clip: padding-box;
  user-select: none;
`;

const AccordionPanel = styled.div`
  margin-bottom: ${({ theme }) => theme.sizes.xl}px;
  padding-left: ${({ theme }) => theme.sizes.md}px;
  padding-right: ${({ theme }) => theme.sizes.md}px;
  grid-column: 1 / 56;
`;

export const Accordion = ({ title, children }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded((state) => !state);
  };

  return (
    <AccordionContainer>
      <IconContainer>
        <ChevronIcon />
      </IconContainer>
      <AccordionTitle onClick={handleClick}>{title}</AccordionTitle>
      {expanded && <AccordionPanel>{children}</AccordionPanel>}
    </AccordionContainer>
  );
};
