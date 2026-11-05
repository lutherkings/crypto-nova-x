import PageShell from "@/components/PageShell";
import MarketsView from "@/components/MarketsView";
export const metadata = { title: "Live Markets | Crypto Nova X" };
export default function Page() {
  return (
    <PageShell title="Live Markets" intro="Watch real cryptocurrency prices and interactive candlestick charts.">
      <MarketsView />
    </PageShell>
  );
}
