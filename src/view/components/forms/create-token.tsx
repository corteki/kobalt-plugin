import { Field, Formik } from "formik";
import { PluginCommand } from "../../../core/plugin-command";
import { CreateTokenInput } from "../../../core/models/inputs";
import { sendCommand } from "../../utilities/create-message-observable";
import { PrimaryButton } from "../button";
import { ColorInput } from "../color-input";
import { Input } from "../input";
import { Stack } from "../stack";
import { FormContainer } from "./form-container";

type CreateTokenProps = {
  namespace: string;
  type: string;
};

const DEFAULT_C0LOR = "#000000";
const DEFAULT_TEXT = "";

const getDefaultValue = (type: string) =>
  type === "color" ? DEFAULT_C0LOR : DEFAULT_TEXT;

export const CreateToken = ({ namespace, type }: CreateTokenProps) => {
  return (
    <Formik
      initialValues={{
        token: { name: DEFAULT_TEXT, value: getDefaultValue(type) },
        namespace,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendCommand<CreateTokenInput>(PluginCommand.Create.Token, values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <FormContainer>
          <Stack>
            <Field name="token.name" type="text" as={Input} />
            {type === "text" && (
              <Field name="token.value" type="text" as={Input} />
            )}
            {type === "color" && (
              <ColorInput
                name="token.value"
                value={values.token.value}
                onChange={(color) => setFieldValue("token.value", color)}
              />
            )}
            <PrimaryButton type="submit">add</PrimaryButton>
          </Stack>
        </FormContainer>
      )}
    </Formik>
  );
};
