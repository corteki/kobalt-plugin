import styled from "styled-components";

type SkeletonProps = {
  height: number;
  width?: number;
};

export const Skeleton = styled.div<SkeletonProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  margin-bottom: ${({ theme }) => theme.sizes.md}px;
  background-color: ${({ theme }) => theme.color.bg.tertiary.value};
  animation: loading 1s linear infinite alternate;
  @keyframes loading {
    0% {
      filter: brightness(75%);
    }
    100% {
      filter: brightness(100%);
    }
  }
`;
