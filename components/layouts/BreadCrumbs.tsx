import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface BreadCrumbItem {
  name: string;
  url: string;
}

const BreadCrumbs = ({
  breadCrumbList,
}: {
  breadCrumbList: BreadCrumbItem[];
}) => {
  return (
    <section className="py-5 sm:py-7 bg-blue-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
          {breadCrumbList?.map((breadCrumb, index) => (
            <li className="inline-flex items-center" key={index}>
              <Link
                href={breadCrumb.url}
                className="text-gray-600 hover:text-blue-600"
              >
                {breadCrumb.name}
              </Link>

              {breadCrumbList?.length - 1 !== index && (
                <FaChevronRight size={15} className="ml-3 text-gray-400 " />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
