import Downshift from 'downshift';
import * as React from 'react';

import { cls } from '@/lib/clsxm';
import {
  filterOptionsByQuery,
  SearchableDropdownOption,
} from '@/lib/dropdown-search';

import { borderByStatus } from './border';
import { useFieldControlContext } from './field-context';

export interface SearchableDropdownProps
  extends React.ComponentPropsWithoutRef<'input'> {
  id: string; // id is required for this component to be SSR-friendly
  options: Array<SearchableDropdownOption>;
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

  const optionsHaveDescription = options.some((option) => option.description)
    ? true
    : false;

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
      }) => {
        const filteredOptions = inputValue
          ? filterOptionsByQuery(options, inputValue)
          : options;

        return (
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
                <div
                  {...getMenuProps()}
                  className={cls(
                    'absolute z-10 w-full border border-solid border-gray-300 max-h-56 rounded-md text-base overflow-auto sm:text-sm bg-white',
                    optionsHaveDescription && 'divide-y divide-slate-200',
                    status ? borderByStatus[status] : 'border-gray-300',
                    inputProps.disabled && 'bg-gray-100 text-gray-400',
                    className
                  )}
                  onClick={() => openMenu}
                >
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((item, index) =>
                      optionsHaveDescription ? (
                        <div
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
                          <div className='font-medium mb-1'>{item.label}</div>
                          <div className='text-gray-800'>
                            {item.description}
                          </div>
                        </div>
                      ) : (
                        <div
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
                        </div>
                      )
                    )
                  ) : (
                    <div className='py-2 mx-2 text-gray-500 text-sm'>
                      No Result
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
});
