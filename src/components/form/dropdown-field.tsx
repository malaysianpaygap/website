import * as React from 'react';

import { Dropdown, DropdownProps } from './dropdown';
import { Field } from './field';
import { ComposedFieldProps, groupProps } from './field.helper';

export interface DropdownFieldProps extends DropdownProps, ComposedFieldProps {}

export const DropdownField = React.forwardRef<
  HTMLSelectElement,
  DropdownFieldProps
>(function DropdownField(props, ref) {
  const { fieldProps, controlProps } = groupProps(props);

  return (
    <Field
      secondaryLabel={controlProps.required ? undefined : 'Optional'}
      {...fieldProps}
    >
      <Dropdown {...controlProps} ref={ref} />
    </Field>
  );
});
