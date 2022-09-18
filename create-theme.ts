import fs from "fs";

type Tree = {
  [key: string]: Tree | string;
};

function mergeDeep(...objects: Tree[]) {
  const isObject = (obj: Tree | string) => obj && typeof obj === "object";

  return objects.reduce<Tree | string>((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = (prev as Tree)[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        (prev as Tree)[key] = pVal.concat(...oVal) as any;
      } else if (isObject(pVal) && isObject(oVal)) {
        (prev as Tree)[key] = mergeDeep(pVal as Tree, oVal as Tree);
      } else {
        (prev as Tree)[key] = oVal;
      }
    });

    return prev;
  }, {});
}

const toObjects = (tree: Tree) => {
  return Object.keys(tree)
    .map((item) => {
      const value = tree[item];
      const elements = item.match(/[A-Z][a-z]+/g);
      if (elements) {
        const levels = elements.length;
        return elements.reduceRight((accumulator, current, index) => {
          const key = current.toLowerCase();
          if (index === levels - 1) {
            return {
              [key]: { value },
            };
          }
          return {
            [key]: accumulator,
          };
        }, {} as Tree);
      }
    }, {} as Tree)
    .reduce((accumulator, current) => {
      if (accumulator && current) {
        accumulator = mergeDeep(accumulator, current) as Tree;
      }
      return accumulator;
    }, {});
};

const result = toObjects({
  ColorBg: "var(--figma-color-bg)",
  ColorBgBrand: "var(--figma-color-bg-brand)",
  ColorBgBrandHover: "var(--figma-color-bg-brand-hover)",
  ColorBgBrandPressed: "var(--figma-color-bg-brand-pressed)",
  ColorBgBrandSecondary: "var(--figma-color-bg-brand-secondary)",
  ColorBgBrandTertiary: "var(--figma-color-bg-brand-tertiary)",
  ColorBgComponent: "var(--figma-color-bg-component)",
  ColorBgComponentHover: "var(--figma-color-bg-component-hover)",
  ColorBgComponentPressed: "var(--figma-color-bg-component-pressed)",
  ColorBgComponentSecondary: "var(--figma-color-bg-component-secondary)",
  ColorBgComponentTertiary: "var(--figma-color-bg-component-tertiary)",
  ColorBgDanger: "var(--figma-color-bg-danger)",
  ColorBgDangerHover: "var(--figma-color-bg-danger-hover)",
  ColorBgDangerPressed: "var(--figma-color-bg-danger-pressed)",
  ColorBgDangerSecondary: "var(--figma-color-bg-danger-secondary)",
  ColorBgDangerTertiary: "var(--figma-color-bg-danger-tertiary)",
  ColorBgDisabled: "var(--figma-color-bg-disabled)",
  ColorBgDisabledSecondary: "var(--figma-color-bg-disabled-secondary)",
  ColorBgHover: "var(--figma-color-bg-hover)",
  ColorBgInverse: "var(--figma-color-bg-inverse)",
  ColorBgOnselected: "var(--figma-color-bg-onselected)",
  ColorBgOnselectedHover: "var(--figma-color-bg-onselected-hover)",
  ColorBgOnselectedPressed: "var(--figma-color-bg-onselected-pressed)",
  ColorBgPressed: "var(--figma-color-bg-pressed)",
  ColorBgSecondary: "var(--figma-color-bg-secondary)",
  ColorBgSelected: "var(--figma-color-bg-selected)",
  ColorBgSelectedHover: "var(--figma-color-bg-selected-hover)",
  ColorBgSelectedPressed: "var(--figma-color-bg-selected-pressed)",
  ColorBgSelectedSecondary: "var(--figma-color-bg-selected-secondary)",
  ColorBgSelectedStrong: "var(--figma-color-bg-selected-strong)",
  ColorBgSelectedTertiary: "var(--figma-color-bg-selected-tertiary)",
  ColorBgSuccess: "var(--figma-color-bg-success)",
  ColorBgSuccessHover: "var(--figma-color-bg-success-hover)",
  ColorBgSuccessPressed: "var(--figma-color-bg-success-pressed)",
  ColorBgSuccessSecondary: "var(--figma-color-bg-success-secondary)",
  ColorBgSuccessTertiary: "var(--figma-color-bg-success-tertiary)",
  ColorBgTertiary: "var(--figma-color-bg-tertiary)",
  ColorBgWarning: "var(--figma-color-bg-warning)",
  ColorBgWarningHover: "var(--figma-color-bg-warning-hover)",
  ColorBgWarningPressed: "var(--figma-color-bg-warning-pressed)",
  ColorBgWarningSecondary: "var(--figma-color-bg-warning-secondary)",
  ColorBgWarningTertiary: "var(--figma-color-bg-warning-tertiary)",
  ColorBorder: "var(--figma-color-border)",
  ColorBorderBrand: "var(--figma-color-border-brand)",
  ColorBorderBrandStrong: "var(--figma-color-border-brand-strong)",
  ColorBorderComponent: "var(--figma-color-border-component)",
  ColorBorderComponentHover: "var(--figma-color-border-component-hover)",
  ColorBorderComponentStrong: "var(--figma-color-border-component-strong)",
  ColorBorderDanger: "var(--figma-color-border-danger)",
  ColorBorderDangerStrong: "var(--figma-color-border-danger-strong)",
  ColorBorderDisabled: "var(--figma-color-border-disabled)",
  ColorBorderDisabledStrong: "var(--figma-color-border-disabled-strong)",
  ColorBorderOnbrand: "var(--figma-color-border-onbrand)",
  ColorBorderOnbrandStrong: "var(--figma-color-border-onbrand-strong)",
  ColorBorderOncomponent: "var(--figma-color-border-oncomponent)",
  ColorBorderOncomponentStrong: "var(--figma-color-border-oncomponent-strong)",
  ColorBorderOndanger: "var(--figma-color-border-ondanger)",
  ColorBorderOndangerStrong: "var(--figma-color-border-ondanger-strong)",
  ColorBorderOnselected: "var(--figma-color-border-onselected)",
  ColorBorderOnselectedStrong: "var(--figma-color-border-onselected-strong)",
  ColorBorderOnsuccess: "var(--figma-color-border-onsuccess)",
  ColorBorderOnsuccessStrong: "var(--figma-color-border-onsuccess-strong)",
  ColorBorderOnwarning: "var(--figma-color-border-onwarning)",
  ColorBorderOnwarningStrong: "var(--figma-color-border-onwarning-strong)",
  ColorBorderSelected: "var(--figma-color-border-selected)",
  ColorBorderSelectedStrong: "var(--figma-color-border-selected-strong)",
  ColorBorderStrong: "var(--figma-color-border-strong)",
  ColorBorderSuccess: "var(--figma-color-border-success)",
  ColorBorderSuccessStrong: "var(--figma-color-border-success-strong)",
  ColorBorderWarning: "var(--figma-color-border-warning)",
  ColorBorderWarningStrong: "var(--figma-color-border-warning-strong)",
  ColorIcon: "var(--figma-color-icon)",
  ColorIconBrand: "var(--figma-color-icon-brand)",
  ColorIconBrandPressed: "var(--figma-color-icon-brand-pressed)",
  ColorIconBrandSecondary: "var(--figma-color-icon-brand-secondary)",
  ColorIconBrandTertiary: "var(--figma-color-icon-brand-tertiary)",
  ColorIconComponent: "var(--figma-color-icon-component)",
  ColorIconComponentPressed: "var(--figma-color-icon-component-pressed)",
  ColorIconComponentSecondary: "var(--figma-color-icon-component-secondary)",
  ColorIconComponentTertiary: "var(--figma-color-icon-component-tertiary)",
  ColorIconDanger: "var(--figma-color-icon-danger)",
  ColorIconDangerHover: "var(--figma-color-icon-danger-hover)",
  ColorIconDangerPressed: "var(--figma-color-icon-danger-pressed)",
  ColorIconDangerSecondary: "var(--figma-color-icon-danger-secondary)",
  ColorIconDangerSecondaryHover: "var(--figma-color-icon-danger-secondary-hover)",
  ColorIconDangerTertiary: "var(--figma-color-icon-danger-tertiary)",
  ColorIconDisabled: "var(--figma-color-icon-disabled)",
  ColorIconHover: "var(--figma-color-icon-hover)",
  ColorIconOnbrand: "var(--figma-color-icon-onbrand)",
  ColorIconOnbrandSecondary: "var(--figma-color-icon-onbrand-secondary)",
  ColorIconOnbrandTertiary: "var(--figma-color-icon-onbrand-tertiary)",
  ColorIconOncomponent: "var(--figma-color-icon-oncomponent)",
  ColorIconOncomponentSecondary: "var(--figma-color-icon-oncomponent-secondary)",
  ColorIconOncomponentTertiary: "var(--figma-color-icon-oncomponent-tertiary)",
  ColorIconOndanger: "var(--figma-color-icon-ondanger)",
  ColorIconOndangerSecondary: "var(--figma-color-icon-ondanger-secondary)",
  ColorIconOndangerTertiary: "var(--figma-color-icon-ondanger-tertiary)",
  ColorIconOndisabled: "var(--figma-color-icon-ondisabled)",
  ColorIconOninverse: "var(--figma-color-icon-oninverse)",
  ColorIconOnselected: "var(--figma-color-icon-onselected)",
  ColorIconOnselectedSecondary: "var(--figma-color-icon-onselected-secondary)",
  ColorIconOnselectedStrong: "var(--figma-color-icon-onselected-strong)",
  ColorIconOnselectedTertiary: "var(--figma-color-icon-onselected-tertiary)",
  ColorIconOnsuccess: "var(--figma-color-icon-onsuccess)",
  ColorIconOnsuccessSecondary: "var(--figma-color-icon-onsuccess-secondary)",
  ColorIconOnsuccessTertiary: "var(--figma-color-icon-onsuccess-tertiary)",
  ColorIconOnwarning: "var(--figma-color-icon-onwarning)",
  ColorIconOnwarningSecondary: "var(--figma-color-icon-onwarning-secondary)",
  ColorIconOnwarningTertiary: "var(--figma-color-icon-onwarning-tertiary)",
  ColorIconPressed: "var(--figma-color-icon-pressed)",
  ColorIconSecondary: "var(--figma-color-icon-secondary)",
  ColorIconSecondaryHover: "var(--figma-color-icon-secondary-hover)",
  ColorIconSelected: "var(--figma-color-icon-selected)",
  ColorIconSelectedSecondary: "var(--figma-color-icon-selected-secondary)",
  ColorIconSelectedTertiary: "var(--figma-color-icon-selected-tertiary)",
  ColorIconSuccess: "var(--figma-color-icon-success)",
  ColorIconSuccessPressed: "var(--figma-color-icon-success-pressed)",
  ColorIconSuccessSecondary: "var(--figma-color-icon-success-secondary)",
  ColorIconSuccessTertiary: "var(--figma-color-icon-success-tertiary)",
  ColorIconTertiary: "var(--figma-color-icon-tertiary)",
  ColorIconTertiaryHover: "var(--figma-color-icon-tertiary-hover)",
  ColorIconWarning: "var(--figma-color-icon-warning)",
  ColorIconWarningPressed: "var(--figma-color-icon-warning-pressed)",
  ColorIconWarningSecondary: "var(--figma-color-icon-warning-secondary)",
  ColorIconWarningTertiary: "var(--figma-color-icon-warning-tertiary)",
  ColorText: "var(--figma-color-text)",
  ColorTextBrand: "var(--figma-color-text-brand)",
  ColorTextBrandSecondary: "var(--figma-color-text-brand-secondary)",
  ColorTextBrandTertiary: "var(--figma-color-text-brand-tertiary)",
  ColorTextComponent: "var(--figma-color-text-component)",
  ColorTextComponentPressed: "var(--figma-color-text-component-pressed)",
  ColorTextComponentSecondary: "var(--figma-color-text-component-secondary)",
  ColorTextComponentTertiary: "var(--figma-color-text-component-tertiary)",
  ColorTextDanger: "var(--figma-color-text-danger)",
  ColorTextDangerSecondary: "var(--figma-color-text-danger-secondary)",
  ColorTextDangerTertiary: "var(--figma-color-text-danger-tertiary)",
  ColorTextDisabled: "var(--figma-color-text-disabled)",
  ColorTextHover: "var(--figma-color-text-hover)",
  ColorTextOnbrand: "var(--figma-color-text-onbrand)",
  ColorTextOnbrandSecondary: "var(--figma-color-text-onbrand-secondary)",
  ColorTextOnbrandTertiary: "var(--figma-color-text-onbrand-tertiary)",
  ColorTextOncomponent: "var(--figma-color-text-oncomponent)",
  ColorTextOncomponentSecondary: "var(--figma-color-text-oncomponent-secondary)",
  ColorTextOncomponentTertiary: "var(--figma-color-text-oncomponent-tertiary)",
  ColorTextOndanger: "var(--figma-color-text-ondanger)",
  ColorTextOndangerSecondary: "var(--figma-color-text-ondanger-secondary)",
  ColorTextOndangerTertiary: "var(--figma-color-text-ondanger-tertiary)",
  ColorTextOndisabled: "var(--figma-color-text-ondisabled)",
  ColorTextOninverse: "var(--figma-color-text-oninverse)",
  ColorTextOnselected: "var(--figma-color-text-onselected)",
  ColorTextOnselectedSecondary: "var(--figma-color-text-onselected-secondary)",
  ColorTextOnselectedStrong: "var(--figma-color-text-onselected-strong)",
  ColorTextOnselectedTertiary: "var(--figma-color-text-onselected-tertiary)",
  ColorTextOnsuccess: "var(--figma-color-text-onsuccess)",
  ColorTextOnsuccessSecondary: "var(--figma-color-text-onsuccess-secondary)",
  ColorTextOnsuccessTertiary: "var(--figma-color-text-onsuccess-tertiary)",
  ColorTextOnwarning: "var(--figma-color-text-onwarning)",
  ColorTextOnwarningSecondary: "var(--figma-color-text-onwarning-secondary)",
  ColorTextOnwarningTertiary: "var(--figma-color-text-onwarning-tertiary)",
  ColorTextSecondary: "var(--figma-color-text-secondary)",
  ColorTextSecondaryHover: "var(--figma-color-text-secondary-hover)",
  ColorTextSelected: "var(--figma-color-text-selected)",
  ColorTextSelectedSecondary: "var(--figma-color-text-selected-secondary)",
  ColorTextSelectedTertiary: "var(--figma-color-text-selected-tertiary)",
  ColorTextSuccess: "var(--figma-color-text-success)",
  ColorTextSuccessSecondary: "var(--figma-color-text-success-secondary)",
  ColorTextSuccessTertiary: "var(--figma-color-text-success-tertiary)",
  ColorTextTertiary: "var(--figma-color-text-tertiary)",
  ColorTextTertiaryHover: "var(--figma-color-text-tertiary-hover)",
  ColorTextWarning: "var(--figma-color-text-warning)",
  ColorTextWarningSecondary: "var(--figma-color-text-warning-secondary)",
  ColorTextWarningTertiary: "var(--figma-color-text-warning-tertiary)",
});

fs.writeFileSync("theme.ts", JSON.stringify(result, null, 2));
