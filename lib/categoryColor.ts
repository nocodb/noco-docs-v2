export const getCategoryColor = (category: string): string => {
    switch (category) {
        case 'Engineering':
            return '#5eccff';
        case 'Guides':
            return '#fd61d1';
        case 'Company':
            return '#fcbe3a';
        default:
            return '#F0F3FF';

    }
}