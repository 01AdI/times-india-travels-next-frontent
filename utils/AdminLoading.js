export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7f8]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#124d56]" />

        <p className="text-sm font-medium text-slate-500">
          Loading admin panel...
        </p>
      </div>
    </div>
  );
}