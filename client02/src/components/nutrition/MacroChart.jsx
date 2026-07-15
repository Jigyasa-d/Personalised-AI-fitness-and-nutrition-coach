import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#c8ff3d', '#7aa2ff', '#ff7a52'];

export default function MacroChart({ macros = {} }) {
  const data = [
    { name: 'Protein', value: Number(macros.protein) || 0 },
    { name: 'Carbs',   value: Number(macros.carbs) || 0 },
    { name: 'Fats',    value: Number(macros.fats) || 0 },
  ];
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <div className="relative h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data} dataKey="value" nameKey="name"
            innerRadius={62} outerRadius={92} paddingAngle={3}
            stroke="none"
          >
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: '#3a3a45' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-8">
        <div className="text-[10px] uppercase tracking-widest text-ink-400">Total g</div>
        <div className="font-serif text-3xl text-ink-900">{total}</div>
      </div>
    </div>
  );
}
