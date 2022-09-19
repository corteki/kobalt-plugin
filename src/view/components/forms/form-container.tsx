import { Form } from "formik";
import styled from "styled-components";

export const FormContainer = styled(Form)`
  min-height: ${({ theme }) => theme.sizes.xl * theme.sizes.sm}px;
  padding: ${({ theme }) => theme.sizes.lg}px 0;
`;
