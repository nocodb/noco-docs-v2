export const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Engineering":
      return "#E7E7E9";
    case "Guides":
      return "#D4F7E0";
    case "Company":
      return "#FFF0D1";
    default:
      return "#F0F3FF";
  }
};
