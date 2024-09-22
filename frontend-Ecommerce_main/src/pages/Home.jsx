import Banner from "../components/Banner";
import Category from "../components/Category";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Category />
      <div className="py-[45px]">
        <FeatureProducts />
      </div>

      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Product" />
            </div>
            <div className="overflow-hidden">
              <Products title="Top Rated Product" />
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Product" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
