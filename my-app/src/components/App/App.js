import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Carousel from 'react-images';
// import { render } from "react-dom";
// import Gallery from "react-photo-gallery";
// import { photos } from "../../photos";
// import Photo from "../../Photo";
// import arrayMove from "array-move";
// import { SortableContainer, SortableElement } from "react-sortable-hoc";

import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../elements/Movie/Movie';
import NotFound from '../elements/NotFound/NotFound';
import PropsAndState from '../elements/PropsAndState/PropsAndState';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// const SortablePhoto = SortableElement(item => <Photo {...item} />);
// const SortableGallery = SortableContainer(({ items }) => (
//   <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
// ));


// function App() {

//   const [items, setItems] = useState(photos);

//   const onSortEnd = ({ oldIndex, newIndex }) => {
//     setItems(arrayMove(items, oldIndex, newIndex));
//   };

//   return (
//     <div className="App">
      
//       <Gallery photos={photos} direction={"column"}  margin={2}/>;
//       {/* <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} /> */}
//     </div>
//   );
// }
const App = () => {
  return (
    <BrowserRouter>
        <React.Fragment>
             <Header />
             <Switch>
               <Route path="/" component={Home} exact ></Route>
               <Route path="/:movieId" component={Movie} exact />
               <Route component={NotFound} />
             </Switch>
        </React.Fragment>
    
    </BrowserRouter>
    // <div className="App">
      
    //     <Home />
    //     {/* <PropsAndState /> */}
    // </div>
  )
}

export default App;
