// components/landing/Features.tsx
const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Kanban Boards</h3>
            <p>Visualize your workflow and manage tasks with ease.</p>
          </div>
          <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Collaboration</h3>
            <p>Work with your team in real-time.</p>
          </div>
          <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Analytics</h3>
            <p>Track your progress and stay productive.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
