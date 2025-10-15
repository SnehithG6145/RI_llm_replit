import { InfographicCard } from "../InfographicCard";
import infographic1 from "@assets/stock_images/infographic_design_w_7b77ce39.jpg";
import avatar1 from "@assets/stock_images/professional_researc_f4eae1c5.jpg";

export default function InfographicCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <InfographicCard
        id="1"
        title="Sitting Is The New Smoking: Breaking The Sedentary Cycle"
        coverImage={infographic1}
        tags={["Health", "Workplace"]}
        researcher={{
          name: "Dr. Emily Johnson",
          avatar: avatar1,
          verified: true,
        }}
        date="2 days ago"
        onClick={() => console.log("Card clicked")}
      />
    </div>
  );
}
