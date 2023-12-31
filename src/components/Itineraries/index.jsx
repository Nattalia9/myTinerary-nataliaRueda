import { useState, useEffect } from "react";
import './style.css'
import itineraries from '/no-itinerary2.jpg';
import { Link as Anchor } from 'react-router-dom'
import { BsPlusLg } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { BsStopwatch } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { PiHash } from "react-icons/pi";
import { useSelector, useDispatch } from 'react-redux';
import {getItineraries}  from '../../redux/actions/itinerariesActions'

export default function Itineraries({cityId}) {

  const dispatch = useDispatch();

  const itineraryStore = useSelector((store) => store.itinerariesReducer);

  useEffect(() => {
    dispatch(getItineraries(cityId));
  }, [dispatch, cityId]);

  const [expandedItineraries, setExpandedItineraries] = useState({});

  const toggleComment = (itineraryId) => {
    setExpandedItineraries(prevState => ({
      ...prevState,
      [itineraryId]: !prevState[itineraryId],
    }));
  };

  return (
    <div className='container i-cont'>
      <div className="row justify-content-center flex-column gap-4 flex-wrap">
      {itineraryStore.itineraries && itineraryStore.itineraries.length  > 0 ? (
          itineraryStore.itineraries.map((itinerary, index) => (
            <div className="col-10 mx-auto flex-wrap" key={index}>
              <div className="itinerary p-4 px-auto flex-wrap">
                <div className="title-button d-flex justify-content-between align-items-center">
                  <h3 className='i-title'>{itinerary.title}</h3>
                  <button title="View more" className={`btn-to-detail ${expandedItineraries[itinerary.id] ? "rotate" : ""}`} onClick={() => toggleComment(itinerary.id)}>
                    <Anchor><BsPlusLg className={`icon-to-detail ${expandedItineraries[itinerary.id] ? "rotate" : ""}`} /></Anchor>
                  </button>
                </div>
                <div className="complete-i d-flex  flex-column flex-xxl-row gap-5">
                  <div className="user d-flex gap-3">
                    <img src={itinerary.userImg} alt="userimg" className='user-img img-fluid' />
                    <div className="data-user">
                      <h5 className='i-userName'>{itinerary.userName}</h5>
                      <p className='p-data'><BsGeoAlt className="icon-i mb-2" />{itinerary.userLocation}</p>
                    </div>
                  </div>
                  <div className="separator d-flex d-none d-xxl-block"></div>
                  <div className="data-itinerary d-flex flex-wrap flex-column flex-md-row gap-3 gap-md-5">
                    <div className="likes text-center">
                      <p className='p-data'><BsHeart className="icon-i cp" />Likes</p>
                      <h5 className="i-data">{itinerary.likes}</h5>
                    </div>
                    <div className="price text-center">
                      <p className='p-data'><BsCashCoin className="icon-i"/>Price</p>
                      <h5 className="i-data">{itinerary.price}</h5>
                    </div>
                    <div className="duration text-center">
                      <p className='p-data'><BsStopwatch className="icon-i" />Duration</p>
                      <h5 className="i-data">{itinerary.duration} hs.</h5>
                    </div>
                    <div className="hashtags">
                      <p className='p-data'><PiHash className="icon-i" />Hashtags</p>
                      <h5 className="i-data">{itinerary.hashtags}</h5>
                    </div>
                  </div>
                </div>
                {expandedItineraries[itinerary.id] && (
                  <div className="comment_act">
                    <h2 className='text-itinerary mt-5 text-center'>Under construction</h2>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="oculto col-5 mx-auto ">
            <h2 className='text-itinerary mt-5 text-center'>There are no itineraries</h2>
            <img src={itineraries} alt="no-itineraries" className='i-itineraries img-fluid' />
          </div>
        )}
      </div>
    </div>
  );
}