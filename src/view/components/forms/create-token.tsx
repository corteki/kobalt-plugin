import { Field, Formik } from "formik";
import { PluginCommand } from "../../../core/plugin-command";
import { sendCommand } from "../../utilities/create-message-observable";
import { PrimaryButton } from "../button";
import { Input } from "../input";
import { Stack } from "../stack";
import { FormContainer } from "./form-container";

type CreateTokenProps = {
  namespace: string;
};

export const CreateToken = ({ namespace }: CreateTokenProps) => {
  return (
    <Formik
      initialValues={{ token: { name: "", value: "" }, namespace }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendCommand(PluginCommand.Create.Token, values);
        setSubmitting(false);
        resetForm();
      }}
    >
      <FormContainer>
        <Stack>
          <Field name="token.name" type="text" as={Input} />
          <Field name="token.value" type="text" as={Input} />
          <PrimaryButton type="submit">add</PrimaryButton>
        </Stack>
      </FormContainer>
    </Formik>
  );
};
