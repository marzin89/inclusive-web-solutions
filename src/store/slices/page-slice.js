import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        language: 'Swedish',
        query: '',
        accessibility: 'standard',
        previous: '',
        searchResultsSwedish: [],
        searchResultsGerman: [],
        pageSwedish: [],
        pageGerman: [],
        numberOfPagesSwedish: 0,
        numberOfPagesGerman: 0,
        activeSearchPageSwedish: 0,
        activeSearchPageGerman: 0,
        searchIndexSwedish: 0,
        searchIndexGerman: 0,
        errorMessage: '',
        adminComponent: 'tests',
        adminServiceName: 'Tester',
    },
    reducers: {
        setLanguage(state, action) {
            return {
                ...state,
                language: action.payload,
            };
        },
        setQuery(state, action) {
            return {
                ...state,
                query: action.payload,
            };
        },
        setAccessibility(state, action) {
            return {
                ...state,
                previous: state.accessibility,
                accessibility: action.payload,
            };
        },
        search(state, action) {
            let resultsSwedish = [];
            let resultsGerman = [];
            let numberOfPagesSwedish;
            let numberOfPagesGerman;

            action.payload.foreach((page) => {
                if (page.title.toLowerCase().indexOf(state.query.toLowerCase()) >= 0 ||
                    page.content.toLowerCase().indexOf(state.query.toLowerCase()) >= 0) {

                    if (state.language == 'Swedish') {
                        resultsSwedish.push(page);
                    
                    } else {
                        resultsGerman.push(page);
                    }
                }
            });

            if (resultsSwedish.length > 5) {
                numberOfPagesSwedish = Math.ceil(resultsSwedish.length / 5);
            
            } else {
                numberOfPagesSwedish = 1;
            }

            if (resultsGerman.length > 5) {
                numberOfPagesGerman = Math.ceil(resultsGerman.length / 5);
            
            } else {
                numberOfPagesGerman = 1;
            }

            return {
                ...state,
                searchResultsSwedish: resultsSwedish,
                searchResultsGerman: resultsGerman,
                numberOfPagesSwedish: numberOfPagesSwedish,
                numberOfPagesGerman: numberOfPagesGerman,
            };
        },
        toggleSwedish(state, action) {
            let index;
            let page = [];

            if (action.payload == 1) {
                index = 0;
            
            } else {
                index = (action.payload - 1) * 5;
            }

            for (let i = index; i < (index + 5); i++) {
                if (state.searchResultsSwedish[i]) {
                    page.push(state.searchResultsSwedish[i]);
                }
            }

            return {
                ...state,
                pageSwedish: page,
                activeSearchPageSwedish: action.payload,
                searchIndexSwedish: index,
            };
        },
        toggleGerman(state, action) {
            let index;
            let page = [];

            if (action.payload == 1) {
                index = 0;
            
            } else {
                index = (action.payload - 1) * 5;
            }

            for (let i = index; i < (index + 5); i++) {
                if (state.searchResultsGerman[i]) {
                    page.push(state.searchResultsGerman[i]);
                }
            }

            return {
                ...state,
                pageGerman: page,
                activeSearchPageGerman: action.payload,
                searchIndexGerman: index,
            };
        },
        setErrorMessage(state, action) {
            return {
                ...state,
                errorMessage: action.payload,
            };
        },
        setAdminComponent(state, action) {
            return {
                ...state,
                adminComponent: action.payload.component,
                adminServiceName: action.payload.serviceName,
            }
        }
    }
});

export const pageActions = pageSlice.actions;
export default pageSlice;