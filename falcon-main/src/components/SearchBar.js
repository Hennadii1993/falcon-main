import * as React from 'react';
import {SearchBar} from '@rneui/themed';
import { input } from '../config';

const Search = () => {
  const search = 'a';

  const updateSearch = e => {
    if (!e.target.value) return setSearchResults(posts);

    const resultsArray = posts.filter(
      post =>
        post.title.includes(e.target.value) ||
        post.subTitle.includes(e.target.value),
    );

    setSearchResults(resultsArray);
  };

  return (
    <SearchBar
      placeholder="Search"
      placeholderTextColor={input.placeHolderColor}
      onChangeText={updateSearch}
      value={search}
    />
  );
};

export default Search;
