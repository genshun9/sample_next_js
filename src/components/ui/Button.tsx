import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    // 基本スタイル
    let buttonClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    // バリアント別スタイル
    if (variant === 'default') {
      buttonClasses += ' bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
    } else if (variant === 'destructive') {
      buttonClasses += ' bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    } else if (variant === 'outline') {
      buttonClasses += ' border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
    }
    
    // サイズ別スタイル
    if (size === 'default') {
      buttonClasses += ' px-4 py-2 text-sm'
    } else if (size === 'sm') {
      buttonClasses += ' px-3 py-1.5 text-xs'
    } else if (size === 'lg') {
      buttonClasses += ' px-6 py-3 text-base'
    }

    // カスタムクラスがあれば追加
    if (className) {
      buttonClasses += ` ${className}`
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
