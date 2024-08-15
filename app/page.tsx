import Image from "next/image";
import React from "react";
import Searchbar from "@/components/Searchbar";
import HeroCarousel from "@/components/HeroCarousel";
import { getAllProducts } from "@/lib/actions";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const Home = async () => {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="px-6 md:px-20 py-10 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> PriceWise</span>
            </h1>
            <p className="mt-6">
              Powerful self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <Searchbar />
          </div>
          {/* how to import the class of the components*/}
          <div>
            <HeroCarousel />
          </div>
        </div>
      </section>
      {/* <div className="w-80 px-8"> */}
      {/* <HeroCarousel /> */}
      {/* </div> */}
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16 ">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product}/>
            // <>
            //   <div>{product.title}</div>
            //   <Image
            //     src={product.image}
            //     alt={product.category}
            //     width={200}
            //     height={200}
            //   ></Image>
            //   <button className="h-12 w-24 rounded-lg bg-slate-300">
            //     <Link href={product.url}>Buy Now</Link>
            //   </button>
            // </>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
