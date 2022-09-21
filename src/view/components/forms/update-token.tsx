import { Field, Formik } from "formik";
import { PluginCommand } from "../../../core/plugin-command";
import {
  DeleteTokenInput,
  UpdateTokenInput,
} from "../../../core/models/inputs";
import { TokenIdentityOutput } from "../../../core/models/outputs";
import { sendCommand } from "../../utilities/create-message-observable";
import { PrimaryButton, TertiaryButton } from "../button";
import { ColorInput } from "../color-input";
import { Input } from "../input";
import { Stack } from "../stack";
import { FormContainer } from "./form-container";

type CreateTokenProps = {
  token: TokenIdentityOutput;
  namespace: string;
  type: string;
};

export const UpdateToken = ({ token, namespace, type }: CreateTokenProps) => {
  const handleClick = () => {
    sendCommand<DeleteTokenInput>(PluginCommand.Delete.Token, {
      id: token.id,
      namespace,
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ token, namespace }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendCommand<UpdateTokenInput>(PluginCommand.Update.Token, values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <FormContainer>
          <Stack direction="vertical">
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

            <Stack direction="horizontal">
              <PrimaryButton type="submit">save</PrimaryButton>
              <TertiaryButton type="button" onClick={handleClick}>
                delete
              </TertiaryButton>
            </Stack>
          </Stack>
        </FormContainer>
      )}
    </Formik>
  );
};
