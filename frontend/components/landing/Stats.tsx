// components/landing/Stats.tsx
const Stats = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <p className="text-4xl font-bold">10k+</p>
            <p>Active Users</p>
          </div>
          <div>
            <p className="text-4xl font-bold">1M+</p>
            <p>Tasks Completed</p>
          </div>
          <div>
            <p className="text-4xl font-bold">99.9%</p>
            <p>Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
