import Link from "next/link";
import TopProductsPage from "./products/top-purchased/page";
import OnSaleProductsPage from "./products/least-popular/page";
import RecentProductsPage from "./products/most-recent/page";

export const metadata = {
  title: "Next.js 13 E-Commerce App",
};

export default async function HomeProductsPage() {
  return (
    <>
      <section className="mx-10 mb-10 flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mt-12">
        <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
          <p className="mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl">
            Welcome to my shop!
          </p>
          <h1 className="text-black mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl">
            Focus on book lovers
          </h1>
          <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
            Welcome to BookConnect, a vast and diverse collection of books
            spanning various genres and topics, BookConnect provides a seamless
            platform for book lovers to discover, purchase, and connect over
            their shared passion for literature.
          </p>
          <div>
            <Link
              href="/products"
              className="rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 md:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
          <img
            src="https://images.pexels.com/photos/4855552/pexels-photo-4855552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Prouct Image"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>
      <TopProductsPage />
      <OnSaleProductsPage />
      <RecentProductsPage />
      <section className="relative h-200 border-t-2 flex items-center bg-cover bg-center">
        <div
          className="absolute inset-0 bg-opacity-50 bg-cover bg-center z-10"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/6344231/pexels-photo-6344231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          }}
        ></div>
        <div className="absolute inset-0 bg-opacity-75 z-10 bg-black"></div>

        <div className="container mx-auto text-center relative z-20">
          <h2 className="text-4xl my-4 font-bold text-white mb-4">
            The Power of Reading
          </h2>
          <p className="text-lg mx-auto max-w-2xl mb-4 text-white opacity-90">
            Engaging with books unlocks realms of imagination and knowledge,
            connecting us to the triumphs and tribulations of characters. It
            inspires, educates, and transports us through time and space,
            leaving an indelible mark on our hearts. Reading cultivates a
            lifelong love for learning and storytelling.
          </p>
        </div>
      </section>
    </>
  );
}
