import React, { ChangeEvent, useState } from "react";

interface autoCompleteProps {
  data: string[];
}

interface suggestionsListProps {
  query: string;
  suggestedCountries: string[];
  selectQuery: (value: string) => void;
}

function SuggestionsList(props: suggestionsListProps) {
  const highlightQuery = (text: string, highlight: string) => {
    /** 
     * we know the filtered suggestions all include the query,
     * so we can split by that query and return some bold text 
     * */
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

    return (
      <span>
        {parts.map((part, i) =>
          <span
            key={i}
            className={part.toLowerCase() === highlight.toLowerCase() ? 'highlighted' : ''}
          >
            {part}
          </span>
        )}
      </span>
    )
  }


  return (
    <ul className='autocomplete'>
      {props.suggestedCountries.map((suggestion: string) => (
        <li key={suggestion} onClick={() => { props.selectQuery(suggestion) }}>
          {highlightQuery(suggestion, props.query)}
        </li>
      ))}
    </ul>
  )
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
      <div className="input-wrapper">
        <input
          type="text"
          placeholder='What country do you plan to work in?'
          value={query}
          onChange={onTextChanged}
        />
      </div>
      {!selectedCuntry ? (
        suggestedCountries.length > 0 ? (
          <SuggestionsList
            query={query}
            suggestedCountries={suggestedCountries}
            selectQuery={selectQuery}
          />
        ) : query.length > 0 ? (
          <ul className='autocomplete'>
            <li>
              {'No countries found'}
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
