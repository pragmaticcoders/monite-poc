import React, { FC } from 'react';
import { BadgeContainer } from 'components/ui-elements/Badge/styles';

interface BadgeProps {
  knownValues?: Record<string, string>;
  children: any;
}

const Badge: FC<BadgeProps> = ({ knownValues, children }) => {
  const getKnownValueColor = (): string | void => {
    if (!knownValues) {
      return;
    }

    for (const key of Object.keys(knownValues)) {
      if (key.toLowerCase() === children.toLowerCase?.()) {
        return knownValues[key];
      }
    }
  };

  const knownColor = getKnownValueColor();

  if (knownColor) {
    return <BadgeContainer color={knownColor}>{children}</BadgeContainer>;
  }

  return <BadgeContainer>{children}</BadgeContainer>;
};

export default Badge;
