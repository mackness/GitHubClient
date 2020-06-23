import React from 'react'

export interface ILoaderProps {
  className?: string
}

export const Loader: React.FC<ILoaderProps> = ({ className }) => {
  return <p className={`block ${className}`}>Loading...</p>
}
