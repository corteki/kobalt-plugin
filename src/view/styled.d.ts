import "styled-components";
import { FigmaTheme } from "./figma-theme";

declare module "styled-components" {
  export interface DefaultTheme extends FigmaTheme {}
}
