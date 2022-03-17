import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import SliderCastAndCrew from "../UI/Sliders/SliderCastAndCrew";
import SliderTrailer from "../UI/Sliders/SliderTrailer";
import SliderImages from "../UI/Sliders/SliderImages";
import SliderPosters from "../UI/Sliders/SliderPosters";

function TabInfoMovie({
   listCast,
   listCrew,
   listTrailers,
   listBackdrops,
   listPosters,
   handleShow,
   handleShowImage,
}) {
   return (
      <section className="mb-5">
         <Tabs
            defaultActiveKey="1"
            id="tab-movie"
            className="nav-tab-movie mb-4"
         >
            {listCast.length > 0 && (
               <Tab eventKey="1" title="Cast">
                  <SliderCastAndCrew list={listCast} />
               </Tab>
            )}
            {listCrew.length > 0 && (
               <Tab eventKey="2" title="Crew">
                  <SliderCastAndCrew list={listCrew} />
               </Tab>
            )}
            {listTrailers.length > 0 && (
               <Tab eventKey="3" title="Video">
                  <SliderTrailer
                     listTrailers={listTrailers}
                     handleShow={handleShow}
                  />
               </Tab>
            )}
            {listBackdrops.length > 0 && (
               <Tab eventKey="4" title="Backdrops">
                  <SliderImages
                     list={listBackdrops}
                     handleShowImage={handleShowImage}
                  />
               </Tab>
            )}
            {listPosters.length > 0 && (
               <Tab eventKey="5" title="Posters">
                  <SliderPosters
                     list={listPosters}
                     handleShowImage={handleShowImage}
                  />
               </Tab>
            )}
         </Tabs>
      </section>
   );
}

export default TabInfoMovie;
