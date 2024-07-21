const currencyList = [
    {name: "Afghan Afghani", code: "AFA"},
    {name: "Aruban Florin", code: "AWG"},
    {name: "Australian Dollar", code: "AUD"},
    {name: "Bermudan Dollar", code: "BMD"},
    {name: "Bhutanese Ngultrum", code: "BTN"},
    {name: "Bitcoin", code: "BTC"},
    {name: "German Mark", code: "DEM"},
    {name: "Ghanaian Cedi", code: "GHS"},
    {name: "Hong Kong Dollar", code: "HKD"},
    {name: "Hungarian Forint", code: "HUF"},
    {name: "Icelandic Króna", code: "ISK"},
    {name: "Indian Rupee", code: "INR"},
    {name: "Indonesian Rupiah", code: "IDR"},
    {name: "Iranian Rial", code: "IRR"},
    {name: "Iraqi Dinar", code: "IQD"},
    {name: "Israeli New Sheqel", code: "ILS"},
    {name: "Italian Lira", code: "ITL"},
    {name: "Jamaican Dollar", code: "JMD"},
    {name: "Japanese Yen", code: "JPY"},
    {name: "Jordanian Dinar", code: "JOD"},
    {name: "Kazakhstani Tenge", code: "KZT"},
    {name: "Malawian Kwacha", code: "MWK"},
    {name: "Nepalese Rupee", code: "NPR"},
    {name: "Netherlands Antillean Guilder", code: "ANG"},
    {name: "Omani Rial", code: "OMR"},
    {name: "Pakistani Rupee", code: "PKR"},
    {name: "Panamanian Balboa", code: "PAB"},
    {name: "Papua New Guinean Kina", code: "PGK"},
    {name: "Paraguayan Guarani", code: "PYG"},
    {name: "Peruvian Nuevo Sol", code: "PEN"},
    {name: "Philippine Peso", code: "PHP"},
    {name: "Polish Zloty", code: "PLN"},
    {name: "Qatari Rial", code: "QAR"},
    {name: "Romanian Leu", code: "RON"},
    {name: "Russian Ruble", code: "RUB"},
    {name: "Rwandan Franc", code: "RWF"},
    {name: "South African Rand", code: "ZAR"},
    {name: "South Korean Won", code: "KRW"},
    {name: "South Sudanese Pound", code: "SSP"},
    {name: "Special Drawing Rights", code: "XDR"},
    {name: "Sri Lankan Rupee", code: "LKR"},
    {name: "St. Helena Pound", code: "SHP"},
    {name: "Trinidad & Tobago Dollar", code: "TTD"},
    {name: "Tunisian Dinar", code: "TND"},
    {name: "Turkish Lira", code: "TRY"},
    {name: "Turkmenistani Manat", code: "TMT"},
    {name: "Ugandan Shilling", code: "UGX"},
    {name: "Ukrainian Hryvnia", code: "UAH"},
    {name: "United Arab Emirates Dirham", code: "AED"},
    {name: "Uruguayan Peso", code: "UYU"},
    {name: "US Dollar", code: "USD"},
    {name: "Uzbekistan Som", code: "UZS"},
    {name: "Vanuatu Vatu", code: "VUV"},
    {name: "Venezuelan BolÃvar", code: "VEF"},
    {name: "Vietnamese Dong", code: "VND"},
    {name: "Yemeni Rial", code: "YER"},
    {name: "Zambian Kwacha", code: "ZMK"},
    {name: "Zimbabwean dollar", code: "ZWL"}
];

function populateSelectOptions(selectId, options) {
    const select = document.getElementById(selectId);

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.code;
        optionElement.textContent = option.name;
        select.appendChild(optionElement);
    });
}

populateSelectOptions('convertFrom', currencyList);
populateSelectOptions('convertTo', currencyList);


const apiKey = '69799d05ab0c71fcd792539c';


async function convertCurrency() {
    const amountFrom = document.getElementById('amountFrom').value;
    const convertFrom = document.getElementById('convertFrom').value;
    const convertTo = document.getElementById('convertTo').value;


    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${convertFrom}/${convertTo}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const exchangeRate = data.conversion_rate;
        const amountTo = (amountFrom * exchangeRate).toFixed(2);
        document.getElementById('amountTo').value = amountTo;
        document.getElementById('exchangeRate').textContent = `1 ${convertFrom} = ${exchangeRate} ${convertTo}`;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
    }
}

document.getElementById('convertFrom').addEventListener('change', convertCurrency);
document.getElementById('convertTo').addEventListener('change', convertCurrency);
document.getElementById('amountFrom').addEventListener('input', convertCurrency);

document.querySelector('.swap-currency').addEventListener('click', function () {
    const convertFrom = document.getElementById('convertFrom');
    const convertTo = document.getElementById('convertTo');
    const temp = convertFrom.value;
    convertFrom.value = convertTo.value;
    convertTo.value = temp;
    convertCurrency();
});