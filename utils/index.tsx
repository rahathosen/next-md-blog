export const sortByDate = (a:number, b:number) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};
