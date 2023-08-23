import React, { FC } from 'react';

// @ts-ignore
export const getComponentJSX = (Component: FC, props: object) => <Component {...props} />;
