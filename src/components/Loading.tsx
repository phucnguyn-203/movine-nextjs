export default function Loading() {
    return (
        <div className="relative h-[80vh] w-full bg-gray-900 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed1045]"></div>
            </div>
        </div>
    );
}
