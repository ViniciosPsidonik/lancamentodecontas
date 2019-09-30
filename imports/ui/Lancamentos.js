import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLancamento from './AddLancamento';

export default () => {
  return (
    <div>
      <PrivateHeader title="Lançamentos"/>
      <div className="container">
        <AddLancamento/>
        <LinksList/>
      </div>
    </div>
  );
};
