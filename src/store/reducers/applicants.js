import matchSorter from 'match-sorter';

const applicants = (state = { original: [], data: [], filterAll:'', filtered: [], role:'all' }, action) => {
    switch (action.type) {
        case 'APPLICANTS_FETCHED':
			const data = Object.keys(action.payload).map(key=> ({...action.payload[key], id: key}))

            return {
                ...state,
                data,
                original: data            
            }
        case 'ROLE_CHANGE_MOBILE':
            const result = matchSorter(state.original, action.payload.filterAll, {
                  keys: [
                    "name",
					"age",
					"role",
					"experience"
                  ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                });
            return {
                ...state,
                data: result,
                filterAll: action.payload.filterAll
            }
        case 'ROLE_CHANGE':
            if(action.payload.role==='all'){
                return {
                    ...state,
                    data: state.original,
                    role: 'all'
                }
            }
            return {
                ...state,
                role: action.payload.role,
                data:state.original.filter(applicant=>applicant.role === action.payload.role)
            }
        case 'FILTER_ALL':
        case 'ON_FILTER_CHANGE':
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state    
    }
}
export default applicants;