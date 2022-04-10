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
  onChangeValue: (value: string) => void;
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
        onChange={(selectedItem) =>
          onChangeValue(selectedItem ? selectedItem.value : '')
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
            {...getRootProps({}, { suppressRefError: true })}
            ref={forwardedRef}
          >
            <div>
              <input
                {...getInputProps()}
                className='py-2.5 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 block min-w-0 w-full sm:text-sm border border-solid border-gray-300 text-left'
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </div>
            <ul
              {...getMenuProps()}
              className={cls(
                'block min-w-0 w-full sm:text-sm rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50',
                status ? borderByStatus[status] : 'border-gray-300',
                inputProps.disabled && 'bg-gray-100 text-gray-400',
                className
              )}
              {...getToggleButtonProps()}
            >
              {open &&
                inputProps.options
                  .filter(
                    (item) => !inputValue || item.value.includes(inputValue)
                  )
                  .map((item, index) => (
                    <li
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
          </div>
        )}
      </Downshift>
    );
  }
);
