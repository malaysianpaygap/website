import Downshift from 'downshift';
import * as React from 'react';

import { cls } from '@/lib/clsxm';

import { borderByStatus } from './border';
import { useFieldControlContext } from './field-context';

export interface SearchableDropdownProps
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

export const SearchableDropdown = React.forwardRef<
  HTMLSelectElement,
  SearchableDropdownProps
>(function SearchableDropdown(
  { className, onChangeValue, onChange, id, ...inputProps },
  forwardedRef
) {
  const { inputId, status } = useFieldControlContext(id);

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
        inputValue,
        openMenu,
        closeMenu,
        isOpen,
      }) => (
        <div
          ref={forwardedRef}
          {...getRootProps(undefined, { suppressRefError: true })}
        >
          <div>
            <input
              {...getInputProps()}
              className={cls(
                'px-2.5 py-2.5 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 block min-w-0 w-full sm:text-sm border border-solid border-gray-300 text-left',
                status ? borderByStatus[status] : 'border-gray-300',
                inputProps.disabled && 'bg-gray-100 text-gray-400',
                className
              )}
              placeholder='Please choose'
              {...getInputProps({
                onFocus: openMenu,
                onBlur: closeMenu,
              })}
            />
          </div>
          <div className='relative'>
            {isOpen && (
              <ul
                {...getMenuProps()}
                className={cls(
                  'absolute z-10 w-full focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 border border-solid border-gray-300 max-h-56 rounded-md text-base overflow-auto sm:text-sm',
                  status ? borderByStatus[status] : 'border-gray-300',
                  inputProps.disabled && 'bg-gray-100 text-gray-400',
                  className
                )}
                onClick={() => openMenu}
              >
                {inputProps.options.filter(
                  (item) =>
                    !inputValue ||
                    item.value.toLowerCase().includes(inputValue.toLowerCase())
                ).length > 0 ? (
                  inputProps.options
                    .filter(
                      (item) =>
                        !inputValue ||
                        item.value
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        className='px-2 py-2 bg-white'
                        key={item.value}
                        {...getItemProps({
                          key: item.value,
                          item,
                          index,
                        })}
                      >
                        {item.label}
                      </li>
                    ))
                ) : (
                  <li className='py-2 mx-2'> No Result </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </Downshift>
  );
});
