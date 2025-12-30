import DContent from "@/components/dashboard/DContent";
import DHeader from "@/components/dashboard/DHeader";

function Dashboard() {
  return (
    <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
      <DHeader />
      <div className="flex-1 overflow-x-hidden">
        <DContent />
      </div>
    </div>
  );
}

export default Dashboard;
