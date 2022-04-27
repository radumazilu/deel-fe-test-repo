import React, { ChangeEvent, useState } from "react";

interface autoCompleteProps {
  data: string[];
}

const AutoComplete = ({ data }: autoCompleteProps) => {
  const [query, setQuery] = useState('')
  const [selectedCuntry, setSelectedCountry] = useState(false)
  const [suggestedCountries, setSuggestedCountries] = useState([] as string[])

  const filterData = async (query: string) => {
    return data.sort().filter((v: string) => v.toLowerCase().includes(query.toLowerCase()))
  }

  const onTextChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    let filteredSuggestions: string[] = [];
    if (query.length > 0) {
      filteredSuggestions = await filterData(query)
    }
    setQuery(query)
    setSelectedCountry(false)
    setSuggestedCountries(filteredSuggestions)
  };

  const selectQuery = (value: string) => {
    setQuery(value) // show value in the input
    setSelectedCountry(true)
    setSuggestedCountries([]) // hide suggestions
  };

  return (
    <div className='autocomplete-wrapper'>
      <input
        type="text"
        placeholder='What country do you plan to work in?'
        value={query}
        onChange={onTextChanged}
      />
      {!selectedCuntry ? (
        suggestedCountries.length > 0 ? (
          <ul className='autocomplete'>
            {suggestedCountries.map((suggestion: string) => (
              <li key={suggestion} onClick={() => { selectQuery(suggestion) }}>
                {suggestion}
              </li>
            ))}
          </ul>
        ) : query.length > 0 ? (
          <ul className='autocomplete'>
            <li>
              {'No results found'}
            </li>
          </ul>
        ) : null
      ) : (
        null
      )}
    </div>
  );
};

export default AutoComplete
