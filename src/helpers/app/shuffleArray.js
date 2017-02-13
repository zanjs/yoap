export default function shuffle(a) {
  let newArray = [...a];
  
  for (let i = newArray.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [newArray[i - 1], newArray[j]] = [newArray[j], newArray[i - 1]];
  }
  
  return newArray;
}
