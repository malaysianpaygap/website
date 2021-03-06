import Downshift from 'downshift';
import * as React from 'react';

import { cls } from '@/lib/clsxm';

import { borderByStatus } from './border';
import { useFieldControlContext } from './field-context';

export interface SearchableDropdownProps
  extends React.ComponentPropsWithoutRef<'input'> {
  id: string; // id is required for this component to be SSR-friendly
  options: Array<{
    label: string;
    value: string;
  }>;
  /**
   * callback to be invoked when input change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue?: (value: string) => void;
}

export const SearchableDropdown = React.forwardRef<
  HTMLInputElement,
  SearchableDropdownProps
>(function SearchableDropdown(
  { className, onChangeValue, id, options, ...inputProps },
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
        getItemProps,
        inputValue,
        openMenu,
        closeMenu,
        highlightedIndex,
        isOpen,
      }) => (
        <div>
          <div>
            <input
              className={cls(
                'px-2.5 py-2.5 rounded-md shadow-sm block min-w-0 w-full sm:text-sm border border-solid border-gray-300 text-left focus:border-primary-300 focus:ring focus:ring-primary-300 focus:ring-opacity-50  outline-transparent outline-0',
                status ? borderByStatus[status] : 'border-gray-300',
                inputProps.disabled && 'bg-gray-100 text-gray-400',
                className
              )}
              placeholder='Please choose'
              {...getInputProps({
                ...inputProps,
                onFocus: openMenu,
                onBlur: closeMenu,
                ref: forwardedRef,
              })}
            />
          </div>
          <div className='relative'>
            {isOpen && (
              <ul
                {...getMenuProps()}
                className={cls(
                  'absolute z-10 w-full border border-solid border-gray-300 max-h-56 rounded-md text-base overflow-auto sm:text-sm bg-white',
                  status ? borderByStatus[status] : 'border-gray-300',
                  inputProps.disabled && 'bg-gray-100 text-gray-400',
                  className
                )}
                onClick={() => openMenu}
              >
                {options.filter(
                  (item) =>
                    !inputValue ||
                    item.value.toLowerCase().includes(inputValue.toLowerCase())
                ).length > 0 ? (
                  options
                    .filter(
                      (item) =>
                        !inputValue ||
                        item.value
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        className={cls(
                          'px-2 py-2',
                          highlightedIndex === index && 'bg-gray-100'
                        )}
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
                  <li className='py-2 mx-2 text-gray-500 text-sm'>No Result</li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </Downshift>
  );
});
