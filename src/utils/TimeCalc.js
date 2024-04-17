

export const timeCalc = (data) => {
    const date = new Date(data)
    const utcString = date.toISOString();

    const monthArray = ['Jan', 'Feb' ,'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayArray=['Sun', 'Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat'];
    const day = dayArray[date.getDay()];
    const month = monthArray[new Date(utcString).getUTCMonth()];
    const dateValue = new Date(utcString).getUTCDate();
    const year = new Date(utcString).getUTCFullYear();
    return (`${day} ${month} ${dateValue} ${year}`);
}