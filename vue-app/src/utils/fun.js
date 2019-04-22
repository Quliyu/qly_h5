const fun = {
  titleCase5: str => str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase()),
};
export default fun;

