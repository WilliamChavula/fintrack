"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

interface ReactSelectComponentProps {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  placeholder?: string;
  value?: string | null | undefined;
}

const ReactSelectComponent = (props: ReactSelectComponentProps) => {
  const {
    onChange,
    onCreate,
    disabled,
    placeholder,
    value,
    options = [],
  } = props;

  const onSelectChange = (
    selectedOption: SingleValue<{ value: string; label: string }>,
  ) => onChange(selectedOption?.value);

  const optionValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="h-10 text-sm"
      value={optionValue}
      isDisabled={disabled}
      options={options}
      onChange={onSelectChange}
      onCreateOption={onCreate}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderColor: "#e2e8f0",
          "&:hover": {
            borderColor: "#e2e8f0",
          },
        }),
      }}
    />
  );
};

export default ReactSelectComponent;
