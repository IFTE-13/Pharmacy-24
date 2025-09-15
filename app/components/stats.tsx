type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "+1200", label: "Medicines Available" },
  { value: "24/7", label: "Customer Support" },
  { value: "+500k", label: "Happy Customers" },
];

export default function Stats() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">Pharmacy 24 in Numbers</h2>
          <p>
            Trusted by our community, Pharmacy 24 continues to grow with a wide
            range of medicines, dedicated service, and reliable healthcare
            support anytime you need it.
          </p>
        </div>

        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              <div className="text-5xl font-bold">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
