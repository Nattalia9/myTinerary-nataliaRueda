import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Itineraries from '../components/Itineraries'
import HeroDetail from '../components/HeroDetail';
import { useSelector, useDispatch } from 'react-redux';
import {getCityById, resetCity}  from '../redux/actions/citiesActions.js';

export default function CityDetail() {

  const {id} = useParams();

  const dispatch = useDispatch();

  const cityStore = useSelector(store => store.citiesReducer.city)

  useEffect(() => {
    dispatch(getCityById(id));
    return () => dispatch( resetCity())
  },[]);


  return (
    <>
      {!cityStore ? (
        <h2>Loading...</h2>
      ) : (
        <div className='container-fluid p-0 gray-bg'>
          <HeroDetail data={cityStore} />
          <Itineraries cityId={cityStore._id} />
        </div> 
      )}
    </>
  )
}
