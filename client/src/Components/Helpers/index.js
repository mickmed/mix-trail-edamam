

export const sortRecipes = (array, title) => {
    title =
      title === "Recipe"
        ? "name"
        : title === "Calories"
        ? "nutrientVals.nf_calories"
        : title === "Category" && "category";
    console.log(title);

    title = title.split(".");
    console.log(title);

    if (title === "category") {
      console.log(array);
      array.sort();
    } else {
      console.log(array, title);

      array.sort((a, b) => {
        let i = 0;
        // console.log(a, b)
        while (i < title.length) {
          // console.log(title[i])
          a = a[title[i]];
          b = b[title[i]];
          i++;
        }
        console.log(a, b);

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
    }
    
  };