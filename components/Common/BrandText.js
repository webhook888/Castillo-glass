import BrandName from "@/components/Common/BrandName";
import { BRAND_NAME_REGEX, isBrandSegment } from "@/lib/brand";

export default function BrandText({ children }) {
  if (typeof children !== "string") return children;

  const parts = children.split(BRAND_NAME_REGEX);

  return (
    <>
      {parts.map((part, index) =>
        isBrandSegment(part) ? (
          <BrandName key={index}>{part}</BrandName>
        ) : (
          part
        )
      )}
    </>
  );
}
