import React, { useState } from "react";

interface autoCompleteProps {
  data: string[];
}

const AutoComplete = ({ data }: autoCompleteProps) => {
  const [query, setQuery] = useState('')

  return (
    <div className='autocomplete-wrapper'>
    </div>
  );
};

export default AutoComplete
