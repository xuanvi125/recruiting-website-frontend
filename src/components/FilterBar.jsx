import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";

import { useEffect, useState } from "react";

function FilterBar({ callback }) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    callback(new URLSearchParams({ q: keyword }));
  }, [keyword]);

  return (
    <div className="w-4/6">
      <Input
        label="Search"
        onChange={(e) => setKeyword(e.target.value)}
        icon={<MagnifyingGlassCircleIcon className="w-6 h-6" />}
      />
    </div>
  );
}

export default FilterBar;
