const CapitalizeWords = (value: string): string => {
    if (!value) return '';
    return value
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default CapitalizeWords;
