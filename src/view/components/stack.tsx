import styled from "styled-components";

type StackProps = {
  direction?: "vertical" | "horizontal";
};

const directionMap = {
  vertical: "column",
  horizontal: "row",
};

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ direction = "vertical" }) => directionMap[direction]};
  justify-content: space-between;
`;
