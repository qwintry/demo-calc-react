export const countries = {
    'RU': {
        'name': 'Russia',
        'customsLimit': 1120, // in USD
        'customsFormula': '((x - 1120) * 0.3) + 15',
        'customsInfo': '1000 EUR per calendar month per recipient, customs fee is 30% from the amount excessing 1000EUR + static $15 fee.'
    },
    'KZ': {
        'name': 'Kazakhstan',
        'customsLimit': 1120, // in USD
        'customsFormula': '((x - 1120) * 0.3) + 15',
        'customsInfo': '1000 EUR per calendar month per recipient, customs fee is 30% from the amount excessing 1000EUR + static $15 fee.'
    },
    'UA': {
        'name': 'Ukraine',
        'customsLimit': 165, // in USD
        'customsFormula': '((x - 165) * 0.35)',
        'customsInfo': '150EUR per parcel, customs fee is 35% from the amount excessing 150EUR'
    },
};