import set from 'can-set';

function sort (sort, item1, item2) {
    console.log(arguments);
    var prop1 = String(item1[sort.fieldName]).toLowerCase();
    var prop2 = String(item2[sort.fieldName]).toLowerCase();

    // handle undefined values
    if (prop1 !== 0 && prop1 !== false && !prop1) {
        debugger;
        return sort.type === 'asc' ? 1 : -1;
    }
    if (prop2 !== 0 && prop2 !== false && !prop2) {
        debugger;
        return sort.type === 'asc' ? -1 : 1;
    }

    // handle valid values
    if (sort.type === 'asc') {
        return prop1 > prop2 ? 1 : -1;
    }
    return prop1 > prop2 ? -1 : 1;
}

//create a flask-restless set algebra
const algebra = new set.Algebra(
    set.props.sort('sort', sort), {
        filters (none, filters, item) {
            for (const i in filters) {
                const filter = filters[i];

            // handle properties that don't exist...
            // relationship props don't get sent from server
            // in flask-restless
                if (typeof item[filter.name] === 'undefined') {
                    break;
                }

            // handle each filter operator
                const val = item[filter.name];
                switch (filter.operator) {
                case 'like':
                    if (val.indexOf(filter.value) === -1) {
                        return false;
                    }
                    break;
                case 'not_like':
                    if (val.indexOf(filter.value) > -1) {
                        return false;
                    }
                    break;
                case 'starts_with':
                    if (val.indexOf(filter.value) !== 0) {
                        return false;
                    }
                    break;
                case 'ends_with':
                    // val -> 'this is a test string'
                    // val.indexOf('string') -> 15
                    // val.length -> 21
                    //
                    // filter.value -> 'string'
                    // filter.value.length -> 6
                    // val.length - filter.value.length -> 21 - 6 = 15
                    if (val.indexOf(filter.value) !== val.length - filter.value.length) {
                        return false;
                    }
                    break;
                case 'equals':
                    if (val !== filter.value) {
                        return false;
                    }
                    break;
                case 'not_equal_to':
                    if (val === filter.value) {
                        return false;
                    }
                    break;
                case 'greater_than':
                case 'after':
                    if (val <= filter.value) {
                        return false;
                    }
                    break;

                case 'less_than':
                case 'before':
                    if (val >= filter.value) {
                        return false;
                    }
                    break;
                }
            }
            return true;
        },
        perPage () {
            return true;
        },
        pageSize () {
            return true;
        },
        page () {
            return true;
        }
    });

export default algebra;
