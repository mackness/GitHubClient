import React from 'react'
import cx from 'classnames'
import {
  UseComboboxGetLabelPropsOptions,
  UseComboboxGetItemPropsOptions,
} from 'downshift'
import { IOrganization, IEdge } from '../types'

export interface IOrganizationResultsListProps {
  getMenuProps: (options?: UseComboboxGetLabelPropsOptions) => unknown
  getItemProps: (options: UseComboboxGetItemPropsOptions<unknown>) => unknown
  isOpen: boolean
  organizations: IEdge<IOrganization>[]
  highlightedIndex: number
}

export const OrganizationResultsList: React.FC<IOrganizationResultsListProps> = ({
  getMenuProps,
  getItemProps,
  isOpen,
  organizations,
  highlightedIndex,
}) => {
  return (
    <div className="mt-3 absolute bg-white shadow-md right-0 left-0">
      <ul {...getMenuProps()}>
        {isOpen &&
          organizations.map((item: IEdge<IOrganization>, index: number) => (
            <li
              key={`${item}${index}`}
              {...getItemProps({ item: item.node.name, index })}
              className={cx(
                {
                  'bg-teal-100': highlightedIndex === index,
                },
                'flex items-center mb-1 h-7'
              )}
            >
              <img
                src={item.node.avatarUrl}
                alt="GitHub organization avatar"
                className="w-5 h-5 mr-3 rounded-full"
              />
              <div>
                <span className="block">{item.node.name}</span>
                <span className="block text-gray-600 text-sm">
                  {item.node.description}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
