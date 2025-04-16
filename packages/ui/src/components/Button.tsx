import React from 'react';

interface ButtonProps {
  text?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Boton con variantes y tamaños
 *
 * @param text - Texto del boton
 * @param onClick - Funcion de callback al hacer click
 * @param disabled - Deshabilita el boton
 * @param variant - Variante del boton
 * @param size - Tamaño del boton
 */
export default function Button({
  text = 'Click me',
  disabled = false,
  variant = 'primary',
  size = 'medium',
}: ButtonProps) {
  const getButtonClasses = () => {
    const baseClasses =
      'font-sans rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary:
        'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-400',
      secondary:
        'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    };

    const sizeClasses = {
      small: 'py-1 px-3 text-sm',
      medium: 'py-2 px-4 text-base',
      large: 'py-3 px-6 text-lg',
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  };

  return (
    <button disabled={disabled} className={getButtonClasses()}>
      {text}
    </button>
  );
}
