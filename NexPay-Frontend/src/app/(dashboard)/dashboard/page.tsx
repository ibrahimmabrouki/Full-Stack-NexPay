import BalanceCard from "@/components/dashboard/BalanceCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="w-[60%]">
        <BalanceCard />
      </div>
      <RecentTransactions />
    </div>
  );
}
