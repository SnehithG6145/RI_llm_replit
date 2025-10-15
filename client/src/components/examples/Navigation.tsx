import { Navigation } from "../Navigation";
import { ThemeProvider } from "../ThemeProvider";
import infographicAvatar from "@assets/stock_images/professional_researc_f4eae1c5.jpg";

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <Navigation
        userRole="researcher"
        userName="Dr. Sarah Chen"
        userAvatar={infographicAvatar}
        onSearch={(q) => console.log("Search:", q)}
      />
    </ThemeProvider>
  );
}
