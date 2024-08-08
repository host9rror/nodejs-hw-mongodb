const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return null;

    const isContactType = (type) => ['personal', 'home'].includes(type);

    if (isContactType(type)) return type;

    return null; 
};

const parseIsFavourite = (isFavourite) => {
    if (typeof isFavourite === 'string') {
        return isFavourite === 'true'; 
    }

    return null; 
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite); 

    return {
        type: parsedType,
        isFavourite: parsedIsFavourite,
    };
};

