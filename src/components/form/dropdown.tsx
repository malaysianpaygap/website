import Downshift from 'downshift';
import * as React from 'react';

import { cls } from '@/lib/clsxm';

import { borderByStatus } from './border';
import { useFieldControlContext } from './field-context';

export interface DropdownProps
  extends React.ComponentPropsWithoutRef<'select'> {
  /**
   * callback to be invoked when input change. The parameter will
   * be the value instead of the event object
   */
  options: Array<{
    label: string;
    value: string;
  }>;
  onChangeValue?: (value: string) => void;
}

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  function Dropdown(
    { className, onChangeValue, onChange, id, ...inputProps },
    forwardedRef
  ) {
    const { inputId, status } = useFieldControlContext(id);
    const [open, setOpen] = React.useState(false);

    return (
      <Downshift
        id={inputId}
        onChange={
          onChangeValue
            ? (selectedItem) =>
                onChangeValue(selectedItem ? selectedItem.value : '')
            : (selectedItem) => {
                selectedItem;
              }
        }
        itemToString={(item) => (item ? item.value : '')}
      >
        {({
          getInputProps,
          getMenuProps,
          getRootProps,
          getItemProps,
          getToggleButtonProps,
          inputValue,
        }) => (
          <div
            ref={forwardedRef}
            {...getRootProps(undefined, { suppressRefError: true })}
          >
            <div>
              <input
                {...getInputProps()}
                className='px-2.5 py-2.5 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 block min-w-0 w-full sm:text-sm border border-solid border-gray-300 text-left'
                onClick={() => {
                  setOpen(!open);
                }}
                onBlur={() => {
                  setOpen(false);
                }}
              />
            </div>
            {open && (
              <ul
                {...getMenuProps()}
                className={cls(
                  'py-2.5 block min-w-0 w-full sm:text-sm rounded-md shadow-sm focus:border-primary-300 border border-solid border-gray-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50',
                  status ? borderByStatus[status] : 'border-gray-300',
                  inputProps.disabled && 'bg-gray-100 text-gray-400',
                  className
                )}
                {...getToggleButtonProps()}
                onClick={() => setOpen(!open)}
              >
                {inputProps.options
                  .filter(
                    (item) => !inputValue || item.value.includes(inputValue)
                  )
                  .map((item, index) => (
                    <li
                      className='py-2 mx-2'
                      key={item.value}
                      {...getItemProps({
                        key: item.value,
                        item,
                        index,
                      })}
                    >
                      {item.label}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </Downshift>
    );
  }
);
