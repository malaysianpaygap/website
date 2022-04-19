import * as React from 'react';
import {
  Controller,
  FieldError,
  FieldErrors,
  UseControllerProps,
  UseFormReturn,
} from 'react-hook-form';

import { createNamedContext } from '@/lib/create-named-context';
import { useIsClient } from '@/hooks/use-is-client';

import { DropdownField } from './dropdown-field';
import { FieldStatus } from './field-context';
import { LinearScaleField } from './linear-scale-field';
import { NumberField } from './number-field';
import { RadioField } from './radio-field';
import { TextField } from './text-field';
import { TextareaField } from './textarea-field';

interface FormControlContextType {
  form: UseFormReturn<any> | undefined;
  isLoading?: boolean;
}

const FormControlContext = createNamedContext<FormControlContextType>(
  'FormControlContext',
  {
    form: undefined,
  }
);

const FormImpl = React.forwardRef<
  HTMLFormElement,
  React.ComponentPropsWithoutRef<'form'> & FormControlContextType
>(function Form({ form, isLoading, ...props }, forwardedRef) {
  const isClient = useIsClient();

  return (
    <FormControlContext.Provider
      value={React.useMemo(
        () => ({
          form,
          isLoading,
        }),
        [form, isLoading]
      )}
    >
      {/* remove browser default validation when js running */}
      <form noValidate={isClient} {...props} ref={forwardedRef} />
    </FormControlContext.Provider>
  );
});

type FormControlProps<OriControlProps> = Omit<
  OriControlProps,
  'value' | 'onChangeValue'
> & {
  name: string;
  defaultValue?: string;
  rules?: UseControllerProps['rules'];
};

const makeFormControl = <
  OriControlProps extends {
    required?: boolean;
    status?: FieldStatus;
    id?: string;
    helpText?: React.ReactNode;
    minLength?: number;
  }
>(
  Component: React.ComponentType<OriControlProps>
) => {
  function FormControl({
    required,
    minLength,
    rules = required || minLength
      ? {
          required: required && {
            value: required,
            message: `Required`,
          },
          minLength: minLength && {
            value: minLength,
            message: `must be at least ${minLength} character`,
          },
        }
      : undefined,
    ...props
  }: FormControlProps<OriControlProps>) {
    const { form, isLoading } = React.useContext(FormControlContext);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { control } = form!;

    return (
      <Controller
        name={props.name}
        control={control}
        defaultValue={props.defaultValue as any}
        rules={rules}
        render={({ field, fieldState }) => {
          return (
            <Component
              id={field.name}
              {...(props as any)}
              required={required}
              value={field.value}
              name={field.name}
              onChangeValue={field.onChange}
              onBlur={field.onBlur}
              disabled={isLoading}
              status={fieldState.invalid ? 'error' : undefined}
              helpText={fieldState.error && fieldState.error.message}
            />
          );
        }}
      />
    );
  }

  FormControl.displayName = `Form${Component.name || Component.displayName}`;

  return FormControl;
};

export const Form = Object.assign(FormImpl, {
  DropdownField: makeFormControl(DropdownField),
  TextField: makeFormControl(TextField),
  TextareaField: makeFormControl(TextareaField),
  RadioField: makeFormControl(RadioField),
  NumberField: makeFormControl(NumberField),
  LinearScaleField: makeFormControl(LinearScaleField),
});

export const formatErrors = <FormValues extends object>(
  formErrors: FieldErrors<FormValues>,
  labels: Record<keyof FormValues, string>
) => {
  if (!formErrors) {
    return [];
  }

  const errs: Array<string> = [];

  Object.keys(formErrors).forEach((k) => {
    const key = k as keyof FormValues;
    const error: FieldError = (formErrors as any)[key];
    if (error) {
      if ('type' in error) {
        if (error.type === 'required') {
          errs.push(`${labels[key]} is required.`);
        } else if (error.type === 'minLength' && error.message) {
          errs.push(`${labels[key]} ${error.message}.`);
        } else if (error.type === 'pattern' && error.message) {
          errs.push(`${labels[key]} is invalid.`);
        } else {
          // eslint-disable-next-line no-console
          console.log({ error });
        }
      }
    }
  });
  return errs;
};
