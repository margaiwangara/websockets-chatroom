export const forElse = function(items: object[] | any[], options: any) {
  if (items.length > 0)
    for (let item in items)
      return options.fn({ property: item, value: items[item] });
  else return options.inverse();
};
