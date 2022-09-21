import { Field } from "formik";
import { useState } from "react";

import { ChromePicker } from "react-color";
import styled from "styled-components";
import { Input } from "./input";
import { Stack } from "./stack";

const Swatch = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  min-width: ${({ theme }) => theme.sizes.xxl}px;
  height: ${({ theme }) => theme.sizes.xxl}px;
  border-radius: 100%;
  margin-right: ${({ theme }) => theme.sizes.lg}px; ;
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
`;
const Close = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
type ColorInputProps = {
  name: string;
  value: string;
  onChange: (color: string) => void;
};

export const ColorInput = ({ name, value, onChange }: ColorInputProps) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack direction="horizontal">
      <Swatch color={value} onClick={handleClick} />
      <Field name={name} as={Input} />
      {open && (
        <Popover>
          <Close onClick={handleClose} />
          <ChromePicker
            color={value}
            onChange={(color) => onChange(color.hex)}
          />
        </Popover>
      )}
    </Stack>
  );
};
