export const forElse = function(
  this: { forelse: (items: any[] | object[], options: any) => any },
  items: object[] | any[],
  options: any,
) {
  if (items.length > 0)
    for (let item in items)
      return options.fn({ property: item, value: items[item] });
  else return options.inverse(this);
};

/**
 * items: [
 *  item: { item.name, item.surname
 *    name: 'Margai',
 *    surname: 'Wangara'
 *  }
 * ]
 *
 */
