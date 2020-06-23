import React from 'react'
import { IEdge, ILanguage } from '../types'

export interface ILanguagePillsProps {
  languages: IEdge<ILanguage>[]
}

export const LanuagePills: React.FC<ILanguagePillsProps> = ({ languages }) => {
  return (
    <div className="flex flex-wrap px-4 py-4">
      {languages.map((edge: IEdge<ILanguage>, i: number) => {
        return (
          <span
            key={i}
            className="rounded-full px-3 py-1 text-sm font-semibold bg-gray-200 text-gray-700 mr-2 mb-2"
          >
            {edge.node.name}
          </span>
        )
      })}
    </div>
  )
}
