import { Field, Formik } from "formik";
import { PluginCommand } from "../../../core/plugin-command";
import { usePageSelection } from "../../hooks/use-page-selection";
import { sendCommand } from "../../utilities/create-message-observable";
import { PrimaryButton } from "../button";
import { Input } from "../input";
import { Stack } from "../stack";
import { FormContainer } from "./form-container";

export const CreateNamespace = () => {
  const { data } = usePageSelection();

  return (
    <Formik
      initialValues={{ namespace: "", page: data }}
      onSubmit={(values, { setSubmitting }) => {
        sendCommand(PluginCommand.Create.Namespace, values);
        setSubmitting(false);
      }}
    >
      <FormContainer>
        <Stack>
          <Field name="namespace" component={Input} />
          <PrimaryButton type="submit">save</PrimaryButton>
        </Stack>
      </FormContainer>
    </Formik>
  );
};
