export const forElse = (items: object[] | any[]) => {
  if (items.length > 0) {
    for (let item in items) return item;
  } else {
    // if no value is available
    return false;
  }
};

// forelse if no data is available skip else render data in forloop
/**
 * forelse(let data in database)
 * render data.something
 * empty
 *  some element here
 * endforelse
 *
 */
