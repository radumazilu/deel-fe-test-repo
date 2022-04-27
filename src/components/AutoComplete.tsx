import React, { ChangeEvent, useState } from "react";

interface autoCompleteProps {
  data: string[];
}

const AutoComplete = ({ data }: autoCompleteProps) => {
  const [query, setQuery] = useState('')
  const [suggestedCountries, setSuggestedCountries] = useState([] as string[])

  const filterData = async (query: string) => {
    return data.sort().filter((v: string) => v.toLowerCase().includes(query.toLowerCase()))
  }

  const onTextChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    let filteredSuggestions: string[] = [];
    if (query.length > 0) {
      // const regex = new RegExp(`(${query})`, 'gi')
      filteredSuggestions = await filterData(query)
    }
    setQuery(query)
    setSuggestedCountries(filteredSuggestions)
  };

  const selectQuery = (value: string) => {
    setQuery(value) // show value in the input
    setSuggestedCountries([]) // hide suggestions
  };

  return (
    <div className='autocomplete-wrapper'>
      <input
        autoComplete="off"
        value={query}
        onChange={onTextChanged}
        placeholder='What country do you plan to work in?'
        type="text"
      />
      {suggestedCountries.length > 0 ? (
        <ul className='autocomplete-list'>
          {suggestedCountries.map((suggestion: string) => (
            <li key={suggestion} onClick={() => { selectQuery(suggestion) }}>
              {suggestion}
            </li>
          ))}
        </ul>
      ) : query.length > 0 ? (
        <ul className='autocomplete-list'>
          <li>
            {'No results found'}
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default AutoComplete
