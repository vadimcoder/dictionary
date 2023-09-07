// [1, 2, 3].forEach(async (item) => {
//   console.log("item", item);
//
//   await new Promise((resolve) => setTimeout(resolve, 2000));
// });

for (let item of [1, 2, 3]) {
  console.log("item", item);

  await new Promise((resolve) => setTimeout(resolve, 2000));
}
