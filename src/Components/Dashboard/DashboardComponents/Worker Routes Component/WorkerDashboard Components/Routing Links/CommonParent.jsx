import React, { useState } from 'react';
import FindWorkers from '../../ClientRequest';
import RouteLinksWorkers from './RouteLinksWorkers';


function CommonParent() {
 

  return (
    <div>
     <FindWorkers  />
      <RouteLinksWorkers/>
    </div>
  );
}

export default CommonParent;