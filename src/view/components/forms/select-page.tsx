import { Form, Formik } from "formik";
import { PluginCommand } from "../../../core/plugin-command";
import { sendCommand } from "../../utilities/create-message-observable";
import { PrimaryButton } from "../button";
import { Stack } from "../stack";

type SelectPageProps = {
  pages: string[];
};

export const SelectPage = ({ pages }: SelectPageProps) => (
  <Formik
    initialValues={{ page: "" }}
    onSubmit={(values, { setSubmitting }) => {
      sendCommand(PluginCommand.Select.Page, values.page);
      setSubmitting(false);
    }}
  >
    {({ values, handleChange, handleBlur }) => (
      <Form>
        <Stack>
          <select
            name="page"
            value={values.page}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option>Select a page</option>
            {pages.map((page) => (
              <option value={page} label={page}>
                {page}
              </option>
            ))}
          </select>
          <PrimaryButton type="submit">save</PrimaryButton>
        </Stack>
      </Form>
    )}
  </Formik>
);
