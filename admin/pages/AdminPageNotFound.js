import { Link } from "react-router";

// ============================================================
// ADMIN PAGE NOT FOUND
// ============================================================

export default function AdminPageNotFound() {
  return (
    <main className="min-h-screen bg-[#F4EFE4] flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">

        {/* BRANDING */}

        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-10 h-[1px] bg-[#C9A24B]" />

          <span className="text-[#C9A24B] text-xs tracking-[0.3em] uppercase">
            Times India Travels
          </span>

          <span className="w-10 h-[1px] bg-[#C9A24B]" />
        </div>

        {/* ERROR CODE */}

        <p className="text-[#101A2E]/40 text-sm tracking-[0.25em] uppercase mb-4">
          404
        </p>

        {/* TITLE */}

        <h1 className="text-[#101A2E] text-3xl md:text-4xl font-medium">
          Admin page not found
        </h1>

        {/* DESCRIPTION */}

        <p className="text-[#101A2E]/60 text-sm md:text-base leading-relaxed mt-4 max-w-md mx-auto">
          The administration page you are looking for doesn't
          exist or is not available.
        </p>

        {/* ACTION */}

        <Link
          to="/login"
          className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-lg bg-[#101A2E] text-[#F4EFE4] text-sm tracking-[0.08em] uppercase transition-all duration-300 hover:bg-[#C9A24B] hover:text-[#101A2E]"
        >
          Admin Login
        </Link>

      </div>
    </main>
  );
}
