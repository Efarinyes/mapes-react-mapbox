
import { useRef, ChangeEvent, useContext } from 'react';
import { LlocsContext } from '../context/';
import { ResultatCercaLLocs } from './';

export const SearchBar = () => {

    const { cercarLlocsPerNom } = useContext(LlocsContext)
    const debounceRef = useRef<NodeJS.Timeout>();

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current)
            clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            cercarLlocsPerNom(event.target.value);
        }, 400);
    }


    return (
        <div className='search-container'>
            <input
                type="text"
                className='form-control'
                placeholder='Cerca un lloc'
                onChange={onQueryChanged}
            />
            <ResultatCercaLLocs />
        </div>
    )
}
