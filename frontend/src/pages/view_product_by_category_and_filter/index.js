import React, { useEffect, useState } from 'react';
import '../view_product_by_category_and_filter/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../../helpers/ProductCategory';
import SummaryApi from '../../common';
import displayCurrency from '../../helpers/DisplayCurrency';
import VerticalProductCartModel from '../vertical_product_cart_model';

const ViewProductByCategoryAndFilter = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll("category");
    const urlCategoryListObject = {};

    urlCategoryListInArray.forEach(element => {
         urlCategoryListObject[element] = true
    })
    
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [sortBy, setSortBy] = useState("")
 
    const fetchData = async() => {
      setLoading(true);
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers : {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      })
      const dataResponse = await response.json();
      setLoading(false);
      setData(dataResponse?.data || []);
    }

    const handleSelectCategory = (e) => {
        const {name, value, checked} = e.target;
        setSelectCategory((preve) => {
          return{
            ...preve,
            [value] : checked
          }
        })
    }
    useEffect(() => {
      fetchData()
    },[filterCategoryList])

    useEffect(() => {
       const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
         if(selectCategory[categoryKeyName]){
            return categoryKeyName
         }
        return null
       }).filter((element) => element)
       setFilterCategoryList(arrayOfCategory)

       //format for url change when change on the checkbox
       const urlFormat = arrayOfCategory.map((el, index) => {
        if((arrayOfCategory.length - 1) === index){
          return `category=${el}`
        }
        return `catgory=${el}&&`
       })
       navigate("/product-category?" + urlFormat.join(""))
      },[selectCategory])

      const handleOnChangeSortByPrice = (e) => {
         const {value} = e.target;
         setSortBy(value)
         if(value === 'asc'){
            setData(
              (preve) => preve.sort((a, b) => a?.sellingPrice - b?.sellingPrice)
            )
         }
         if(value === 'dsc'){
          setData(
              (preve) => preve.sort((a, b) => b?.sellingPrice - a?.sellingPrice)
          )
         }
      }
      useEffect(() => {

      },[sortBy])
  return (
    <div className='productCategoryPageWrapper'>
       <div className='container'>
            {/* left side */}
            <div className='sidebarWrapper'>
              <div className='titleBox'>
                 <h3>Sort by</h3>
              </div>
              <div className='formBox'>
                <form>
                   <div className='row'>
                     <input
                         type='radio'
                         name='sortBy' 
                         checked={sortBy === "asc"}
                         value={"asc"}
                         onChange={handleOnChangeSortByPrice}
                      />
                     <label>Price - Low to High</label>
                   </div>
                   <div className='row'>
                     <input 
                          type='radio' 
                          name='sortBy' 
                          checked={sortBy === "dsc"}
                          value={"dsc"}
                          onChange={handleOnChangeSortByPrice}
                      />
                     <label>Price - High to Low</label>
                   </div>
                   <div className='row'>
                     <input type='radio' name='sortBy'/>
                     <label>Alphabetical Order - A to Z</label>
                   </div>
                   <div className='row'>
                     <input type='radio' name='sortBy'/>
                     <label>Alphabetical Order - Z to A</label>
                   </div>
                </form>
              </div>
              <div className='titleBox'>
                <h3>Category</h3>
              </div>
              <div className='formBox'>
                <form>
                  {
                    productCategory.map((categoryName, index) => {
                      return(
                        <div className='row' key={index}>
                            <input 
                              type='checkbox'
                              name={'category'}
                              checked={selectCategory[categoryName?.value]}
                              id={categoryName.value}
                              value={categoryName?.value}
                              onChange={handleSelectCategory}
                            />
                            <label 
                              htmlFor={categoryName.value}
                            >
                              {categoryName?.label}
                            </label>
                        </div>
                      )
                    })
                  }
                </form>
              </div>
            </div>
            {/* right side */}
            <div className='displayProductBox'>
                {
                  !loading
                   &&
                   (
                     <div className='searchResultBox'>
                       <p className='searchResult'>
                          Search Results: {data?.length}
                       </p>
                     </div>
                   )
                }
              <div>
                  {
                     <VerticalProductCartModel loading={loading} data={data}/>
                  }
              </div>
            </div>
       </div>
    </div>
  )
}

export default ViewProductByCategoryAndFilter