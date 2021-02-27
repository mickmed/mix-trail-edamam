export const sortRecipes = (array, title) => {
  title =
    title === "Recipe"
      ? "name"
      : title === "Calories"
      ? "nutrientVals.nf_calories"
      : title === "Category" && "category";

  title = title.split(".");

  array.sort((a, b) => {
    let i = 0;

    if (title[0] !== "nutrientVals") {
      a = a[title[title.length - 1]] && a[title[title.length - 1]].toLowerCase();
      b = b[title[title.length - 1]] && b[title[title.length - 1]].toLowerCase();
    } else {
      let i = 0;
      while (i < title.length) {
        console.log("here", a);
        a = a[title[i]];
        b = b[title[i]];
        i++;
      }
    }

    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
};
