export const toCols = (columnName: string[]) => {
  return columnName.map(name => ({
    name,
  }));
};
