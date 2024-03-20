"use client";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

const PropertyPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const pathname = usePathname();

  return (
    <div>
      <button
        onClick={() => router.push("/")}
        className=" bg-blue-600 p-2"
      >
        {id} Go Home {name} {pathname}
      </button>
    </div>
  );
};

export default PropertyPage;
