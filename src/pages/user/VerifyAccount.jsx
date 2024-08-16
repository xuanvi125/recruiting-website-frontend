import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as authServices from "../../services/authService";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { set } from "react-hook-form";

function VerifyAccount() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasVerifiedRef = useRef(false);
  useEffect(() => {
    if (hasVerifiedRef.current) {
      return;
    }
    async function verifyAccount() {
      hasVerifiedRef.current = true;
      const res = await authServices.verifyAccount(searchParams.get("token"));
      if (res.status === "success") {
        toast.success("Account verified successfully");
      } else {
        toast.error(res.message);
      }
    }
    verifyAccount();
  }, [searchParams]);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600"></p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Verify Account Via Email
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600"></p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={"/login"}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go To Login Page
          </Link>
        </div>
      </div>
    </main>
  );
}

export default VerifyAccount;
