export const stringEndFormatterByPoints = (points) => {
    const pointsToString = String(points);
    const lastSymbol = pointsToString[pointsToString.length - 1];
  
    if (lastSymbol === "1") {
      return "балл";
    } else if (["2", "3", "4"].includes(lastSymbol)) {
      return "балла";
    } else if (["5", "6", "7", "8", "9", "0"].includes(lastSymbol)) {
      return "баллов";
    }
  };