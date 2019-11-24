import React from 'react';
function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return (<p>Tets</p>);
    return (<p>Be Hold, fetching data may take some time :)</p>);
  }
}
export default WithLoading;