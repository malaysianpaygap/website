import * as React from 'react';

import {
  SearchableDropdown,
  SearchableDropdownProps,
} from './searchable-dropdown';
import { Field } from './field';
import { ComposedFieldProps, groupProps } from './field.helper';

export interface SearchableDropdownFieldProps
  extends SearchableDropdownProps,
    ComposedFieldProps {}

export const SearchableDropdownField = React.forwardRef<
  HTMLSelectElement,
  SearchableDropdownFieldProps
>(function SearchableDropdownField(props, ref) {
  const { fieldProps, controlProps } = groupProps(props);

  return (
    <Field
      secondaryLabel={controlProps.required ? undefined : 'Optional'}
      {...fieldProps}
    >
      <SearchableDropdown {...controlProps} ref={ref} />
    </Field>
  );
});
