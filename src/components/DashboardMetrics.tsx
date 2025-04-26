import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Clock } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div
            className={`flex items-center text-xs mt-1 ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            <span className="text-muted-foreground ml-1">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardMetricsProps {
  totalOrders: number;
  totalRevenue: number;
  activeCustomers: number;
  pendingOrders: number;
  isLoading?: boolean;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  totalOrders,
  totalRevenue,
  activeCustomers,
  pendingOrders,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-7 bg-muted rounded w-1/2 animate-pulse mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Orders"
        value={totalOrders}
        description="Total orders placed"
        icon={<ShoppingBag className="h-4 w-4" />}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="Revenue"
        value={`${(totalRevenue || 0).toFixed(2)}`}
        description="Total revenue generated"
        icon={<DollarSign className="h-4 w-4" />}
        trend={{ value: 8.2, isPositive: true }}
      />
      <MetricCard
        title="Active Customers"
        value={activeCustomers}
        description="Customers currently ordering"
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="Pending Orders"
        value={pendingOrders}
        description="Orders awaiting preparation"
        icon={<Clock className="h-4 w-4" />}
      />
    </div>
  );
};

export default DashboardMetrics;
