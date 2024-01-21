'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { button, container, buttonText, innerContariner } from './FAB.css';
import { Txt } from '../../Txt';

type ButtonType = 'extand' | 'default';

interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, 'type'> {
  iconUrl: string;
  className?: string;
  type?: ButtonType;
  text?: ReactNode;
}

const FAB = ({ className, iconUrl = '', text, type = 'extand', ...props }: Props) => {
  const [fabType, setFabType] = useState<ButtonType>(type);

  useEffect(() => {
    if (type === 'default') {
      return;
    }

    const timer = setTimeout(() => {
      setFabType('default');
    }, 10_000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className={container}
      initial={{
        width: type === 'default' ? '8.8rem' : '100%',
      }}
      animate={{
        width: '8.8rem',
      }}
      transition={{ duration: 0.3, delay: 10 }}
    >
      <div className={innerContariner}>
        <button type="button" className={clsx(button, className)} {...props}>
          <Image src={iconUrl} width={32} height={32} alt="" />
          {fabType === 'extand' && (
            <Txt typography="p3" className={buttonText}>
              {text}
            </Txt>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default FAB;
