export const getInitials = (name: string) => {
    const initials = name
        .split(' ') // Split the name into words
        .map(word => word[0]) // Get the first letter of each word
        .join(''); // Join the letters together

    return initials.length > 2 ? initials.slice(0, 2) : initials; // Return first two letters if more than two
};

export const generateColorFromInitials = (name: string) => {
    const initials = getInitials(name); // Extract initials
    const charCodes = initials
        .toUpperCase()
        .split('')
        .map(char => char.charCodeAt(0));

    const combinedValue =
        charCodes[0] * 100 + charCodes[initials?.length == 1 ? 0 : 1];
    const number = initials?.length === 1 ? 8 : 2;
    // Generate a color by taking parts of the combined value for RGB
    const red = (combinedValue % 255).toString(16).padStart(2, '0');
    const green = ((combinedValue * number) % 255).toString(16).padStart(2, '0');
    const blue = ((combinedValue * 3) % 255).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
};
