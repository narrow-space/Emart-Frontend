import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";


import Breadcrumbs from "./Breadcrumbs";
import CategorySidebar from "../Share/CategorySidebar";

import Products from "../Allproduct/Products";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { adminGetProducts, filterProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import { adminGetBrand } from "../../redux/Slice/brandSlice/brandSlice";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import Loading from "../Share/Loading";
import Nodatafound from "../Share/Nodatafound";


const ListingProductMain = () => {
  const [alldata, setAlldata] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [slicedata, setsliceData] = useState()
  const [value1, setValue1] = useState("")
  const [size, setSize] = useState("")
  const [brand, setBrand] = useState("")
  const [params, setParams] = useSearchParams()
  const categoryid = params.get('categoryId')

  const dispatch = useDispatch()

  ////fetch brands from database///
  const { GetallBrand } = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(adminGetBrand());
  }, [dispatch]);





  ///Get category from database//

  const { CategoryData } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(adminGetCategory());
  }, [dispatch]);

 


  ///Get products from database and filter by category//
  const { filterproducts: { products }, loading, error } = useSelector((state) => state.products)
 





  useEffect(() => {
    const data = {
      selectedCategory: categoryid,
      price: value1,
      size: size,
      brand: brand.toLowerCase(),
      sortBy: selectedOption?.value,
      limit: selectedOption?.value
    }
    dispatch(filterProducts(data))

  }, [categoryid, value1, size, selectedOption, brand])


  useEffect(() => {

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [categoryid, size, selectedOption, brand])



 


  useEffect(()=>{
    setBrand("")
  },[categoryid])








///filter by price slider//

const filterByPrice = (min, max) => {
  let num1 = min;
  let num2 = max;
  let result = `${num1}-${num2}`
  setValue1(result)

};

// filter by brand//

const filterByBrand = (keyword) => {
 
  setBrand(keyword)
};


///filter by size//

const filterBySize = (keyword) => {
  setSize(keyword)

}









const options = [
  { value: "newest", label: "newest" },
  { value: "oldest", label: "oldest" },
  { value: "priceHighToLow", label: "price high to low" },
  { value: "priceLowToHigh", label: "price low to high" },
];
const options2 = [
  { value: "2", label: "items show 2" },
  { value: "10", label: "items show 10" },
  { value: "15", label: "items show 15" },
  { value: "20", label: "items show 20" },
];


return (
  <div className="container-fluide ">
    <div className="hidden md:flex items-center justify-between my-6 ">
      <div className="ml-[310px] hidden md:block my-0">
        <h1 className="text-[gray]  md:mb-[10px]">
          We found<span className="text-[green]">{products?.length}</span> items
          for you!!
        </h1>


      </div>
      <Select
        className=" ml-auto w-64 mx-4"
        placeholder={`sort by`}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isSearchable={false}
      />

      <Select
        className="w-64"
        placeholder={`items show 50`}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        isSearchable={false}
        options={options2}
      />
    </div>
    <div className="grid md:grid-cols-5 grid-cols-1 gap-4 ">
      <div className="sidebar-wraper ">
        <div className="side-bar md:z-0 z-10">
          <CategorySidebar
            CategoryData={CategoryData}
            GetallBrand={GetallBrand}
            currentCatData={products}
             options={options}
             setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            filterByPrice={filterByPrice}
            filterByBrand={filterByBrand}
            filterBySize={filterBySize}
          />
        </div>
      </div>

      <div className="col-span-4 ">
        <div className="md:hidden">
        <h1 className="text-[gray] my-4">
          We found<span className="text-[green]">{products?.length}</span> items
          for you!!
        </h1>
        </div>
        <div className="productRow ">
          {
            loading ? <Loading /> : products?.length <= 0 ? <Nodatafound /> : <div className=" item grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-2 ">

              {products?.map((i, index) => {
                return (
                  <Products

                    key={index}
                    data={i}
                    tag={i.type}
                    height={"290px"}
                  />
                );
              })}
            </div>
          }
        </div>
      </div>
    </div>
  </div>
)
}


export default ListingProductMain;
