import { useEffect, useState } from "react";

function useParagraphLine(elementRef, numOfLines, reRender) {
  const [isMore, setIsMore] = useState(false);

  // Check Line
  const checkLine = () => {
    const style = getComputedStyle(elementRef.current);
    const lineHeight = parseFloat(style.lineHeight);
    const height = elementRef.current.offsetHeight;
    const lines = height / lineHeight;
    setIsMore(lines > numOfLines);
  };

  useEffect(() => {
    checkLine();
  }, [reRender]);

  return isMore;
}

export default useParagraphLine;
