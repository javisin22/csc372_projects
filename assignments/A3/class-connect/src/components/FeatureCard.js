
export default function FeatureCard({ icon, title, description }) {
    return (
        <div className="flex flex-col items-center justify-center text-center bg-white p-4 rounded-lg shadow-lg">
            {icon}
            <h3 className="text-xl font-semibold mt-4">{title}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
        </div>
    );
}