
export default function Button({ children, background, onClick }) {

    const colorClasses = {
        login: 'bg-white hover:bg-gray-100 text-black border border-gray-300',
        signup: 'bg-black hover:bg-gray-700 text-white border border-gray-700',
    };

    const bgClass = colorClasses[background] || colorClasses.signup;

    return (
        <button
            className={`${bgClass} px-6 py-2 rounded`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
