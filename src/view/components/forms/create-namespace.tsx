import { Field, Formik } from "formik";
import { PluginCommand } from "../../../core/plugin-command";
import { sendCommand } from "../../utilities/create-message-observable";
import { PrimaryButton } from "../button";
import { Input } from "../input";
import { Stack } from "../stack";
import { FormContainer } from "./form-container";

export const CreateNamespace = () => {
  return (
    <Formik
      initialValues={{ namespace: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendCommand(PluginCommand.Create.Namespace, values.namespace);
        setSubmitting(false);
        resetForm();
      }}
    >
      <FormContainer>
        <Stack>
          <Field name="namespace" type="text" as={Input} />
          <PrimaryButton type="submit">save</PrimaryButton>
        </Stack>
      </FormContainer>
    </Formik>
  );
};
