import { Formik } from "formik";
import { PluginCommand } from "../../../core/plugin-command";
import { usePages } from "../../hooks/use-pages";
import { sendCommand } from "../../utilities/create-message-observable";
import { PrimaryButton } from "../button";
import { Select } from "../select";
import { Stack } from "../stack";
import { FormContainer } from "./form-container";

export const SelectPage = () => {
  const { data, loading, error } = usePages();

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>loading Select Page...</p>;
  }

  return (
    <Formik
      initialValues={{ page: "" }}
      onSubmit={(values, { setSubmitting }) => {
        sendCommand(PluginCommand.Select.Page, values.page);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <FormContainer>
          <Stack>
            <Select
              name="page"
              value={values.page}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option>Select a page</option>
              {data?.map((page) => (
                <option value={page} label={page}>
                  {page}
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
