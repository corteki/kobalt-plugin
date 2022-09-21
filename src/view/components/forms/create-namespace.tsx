import { Field, Formik } from "formik";
import { CreateNamespaceInput } from "../../../core/models/inputs";
import { PluginCommand } from "../../../core/plugin-command";
import { sendCommand } from "../../utilities/create-message-observable";
import { PrimaryButton } from "../button";
import { Input } from "../input";
import { Select } from "../select";
import { Stack } from "../stack";
import { FormContainer } from "./form-container";

const types = ["text", "color", "font", "file"];

export const CreateNamespace = () => {
  return (
    <Formik
      initialValues={{ namespace: "", type: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendCommand<CreateNamespaceInput>(
          PluginCommand.Create.Namespace,
          values
        );
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, handleBlur, handleChange }) => (
        <FormContainer>
          <Stack>
            <Field name="namespace" type="text" as={Input} />
            <Select
              name="type"
              value={values.type}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option>select a namespace type</option>
              {types.map((type) => (
                <option value={type} label={type}>
                  {type}
                </option>
              ))}
            </Select>
            <PrimaryButton type="submit">save</PrimaryButton>
          </Stack>
        </FormContainer>
      )}
    </Formik>
  );
};
